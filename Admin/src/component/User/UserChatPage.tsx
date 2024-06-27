import { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { HiDotsVertical, HiOutlinePaperClip } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess, setMessages } from "../../redux/user/UserSlice";
import io from "socket.io-client";

const socket = io("http://localhost:7000");

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderModel: "User" | "Admin";
  text: string;
  createdAt: string;
  senderName?: string;
}

const UserChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser, messages } = useSelector((state: any) => state.user);
  const [callActive, setCallActive] = useState<boolean>(false)
  const [videoCall, setVideoCall] = useState<boolean>(false);
  const [incomminCall, setIncommingCall] = useState<boolean>(false);
  const [acceptedCall, setAcceptedCall] = useState<boolean>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");
  const localVideoRef: any = useRef<HTMLVideoElement>(null);
  const remoteVideoRef: any= useRef<HTMLVideoElement>(null);
  const pc = useRef<RTCPeerConnection>(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  );
  
  useEffect(() => {
    socket.emit("join room", conId);
  
    const handleOffer = async (offer: any) => {
      if (offer.name !== currentUser.username) {
        const acceptCall = window.confirm(`You have a call from ${offer.name}. Do you want to accept the call?`);
  
        if (acceptCall) {
          setCallActive(true);
          const constraints = { audio: true, video: offer.isVideo };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
  
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
  
          await pc.current.setRemoteDescription(new RTCSessionDescription(offer.offer));
          const answer = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answer);
          socket.emit("webrtc-answer", { room: conId, answer, name: currentUser.username });
        } else {
          socket.emit("webrtc-disconnect", conId);
        }
      }
    };
  
    const handleAnswer = async (data: any) => {
      const { name, answer } = data;
      if (currentUser.username !== name) {
        if (pc.current.signalingState === "have-local-offer") {
          try {
            await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
          } catch (error) {
            console.error("Error setting remote description:", error);
          }
        } else {
          console.warn("Signaling state is not 'have-local-offer'. Current state: ", pc.current.signalingState);
        }
      }
    };
  
    const handleIceCandidate = async (candidate: any) => {
      try {
        await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding received ice candidate", error);
      }
    };
  
    const handleDisconnect = () => {
      setCallActive(false);
  
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const localStream = localVideoRef.current.srcObject as MediaStream;
        localStream.getTracks().forEach((track) => track.stop());
        localVideoRef.current.srcObject = null;
      }
  
      if (pc.current) {
        pc.current.getSenders().forEach((sender) => sender.track && sender.track.stop());
        pc.current.close();
        pc.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
      }
  
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
  
      socket.off("webrtc-offer", handleOffer);
      socket.off("webrtc-answer", handleAnswer);
      socket.off("webrtc-ice-candidate", handleIceCandidate);
    };
  
    socket.on("webrtc-offer", handleOffer);
    socket.on("webrtc-answer", handleAnswer);
    socket.on("webrtc-ice-candidate", handleIceCandidate);
    socket.on("webrtc-disconnect", handleDisconnect);
  
    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", { room: conId, candidate: event.candidate });
      }
    };
  
    pc.current.ontrack = (event) => {
      if (event.streams && event.streams.length > 0) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  
    return () => {
      socket.off("webrtc-offer", handleOffer);
      socket.off("webrtc-answer", handleAnswer);
      socket.off("webrtc-ice-candidate", handleIceCandidate);
      socket.off("webrtc-disconnect", handleDisconnect);
    };
  }, [conId, currentUser.username]);
  
  const startCall = async (isVideo = false) => {
    try {
      setVideoCall(isVideo);
      setCallActive(true);
  
      const constraints = { audio: true, video: isVideo };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
  
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
  
      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      socket.emit("webrtc-offer", { name: currentUser.username, room: conId, isVideo, offer });
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };
  

// ------------------| END AN AUDIO OR VIDEO CALL ----------------------------------------------------------------------------------------------------------------------------->  
const handleCutTheCall = () => {
  setCallActive(false);

  // Stop all local media tracks
  if (localVideoRef.current && localVideoRef.current.srcObject) {
    const localStream = localVideoRef.current.srcObject as MediaStream;
    localStream.getTracks().forEach((track) => track.stop());
    localVideoRef.current.srcObject = null;
  }

  // Close the RTCPeerConnection
  if (pc.current) {
    // Stop all tracks added to the peer connection
    pc.current
      .getSenders()
      .forEach((sender) => sender.track && sender.track.stop());
    pc.current.close();
  }
  socket.emit("webrtc-disconnect", conId);

  // Remove socket event listeners
  socket.off("webrtc-offer");
  socket.off("webrtc-answer");
  socket.off("webrtc-ice-candidate");
  // navigate(`/admin_chat/${conId}`);

  // Clear the remote video element's source
  if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = null;
  }
};




  useEffect(() => {
    socket.on("recieve_message", (msg: Message) => {
      if (msg.conversationId === conId) {
        dispatch(setMessages([...messages, msg]));
      }
    });

    return () => {
      socket.off('recieve_message');
    };
  }, [messages, dispatch, conId]);

  const fetchMessages = async () => {
    try {
      const res: any = await axios.get(`/user/get_messages/${conId}`);
      console.log(res);
      console.log(res.data);

      dispatch(setMessages(res.data));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (conId) {
      socket.emit("join room", conId);
      fetchMessages();
    }

    if (currentUser) {
      navigate(`/chat_user?conId=${conId}`);
    } else {
      navigate("/");
    }
  }, [currentUser, conId, navigate]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !conId) return;

    try {
      const response = await axios.post<Message>("/user/send_message", {
        conversationId: conId,
        senderId: currentUser._id,
        senderModel: "User",
        text: newMessage,
      });

      socket.emit("chat message", response.data, conId, currentUser.adminId);
      socket.emit("update conversation", currentUser.adminId);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    navigate("/");
  };

  console.log(messages);

  return (
    <div className="pt-1 h-screen bg-gray-50 flex flex-col">
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center px-5 py-3 border-b-2">
          <div className="flex gap-5 items-center">
            <img
              src="/public/userIcon.webp"
              className="w-10 h-10 rounded-full"
              alt="User"
            />
            {currentUser && (
              <span className="text-xl font-bold">{currentUser.username}</span>
            )}
          </div>
          <div className="flex gap-5 items-center text-2xl text-sky-500">
            <IoCall className="cursor-pointer" onClick={() => startCall(false)} />
            <FaVideo className="cursor-pointer" onClick={() => startCall(true)} />
            <HiDotsVertical className="cursor-pointer" />
            <FiLogOut className="cursor-pointer" onClick={handleSignOut} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            {messages?.length > 0 &&
              messages.map((message: Message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.senderModel === "User"
                      ? "justify-end"
                      : "justify-start"
                  } gap-3`}
                >
                  {message.senderModel !== "User" && (
                    <img
                      src="/public/userIcon.webp"
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex flex-col max-w-[300px] md:max-w-[350px] lg:max-w-[650px]">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                      <span>
                        {message.senderModel === "User"
                          ? "You"
                          : message.senderName || "Admin"}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-100 text-sm overflow-hidden break-words">
                      {message.text}
                    </div>
                  </div>
                  {message.senderModel === "User" && (
                    <img
                      src="/public/userIcon.webp"
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </div>
              ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

{
  callActive &&  <div className="flex flex-col justify-center items-center ">

  <video ref={localVideoRef} autoPlay muted className="w-1/4 absolute bottom-24 z-10 right-24  md:right-96 md:bottom-0 md:w-[250px]"></video>
  <video ref={remoteVideoRef} autoPlay className="w-1/1 relative md:w-[900px] md:h-[600px]"></video>
  
   <button className="absolute bg-sky-500 bottom-0 rounded-full w-16 h-16" onClick={handleCutTheCall}>C</button>
  </div>
}
        <div className="flex justify-between items-center px-5 py-2 bg-sky-200 rounded-lg mt-2">
          <img
            src="/public/userIcon.webp"
            className="w-10 h-10 rounded-full"
            alt="User"
          />
          <input
            type="text"
            placeholder="Write something..."
            className="flex-1 mx-3 p-2 rounded-lg border bg-sky-100 border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <HiOutlinePaperClip className="text-sky-500 text-2xl cursor-pointer" />
          <div
            className="p-2 rounded-full bg-sky-500 ml-3 cursor-pointer"
            onClick={sendMessage}
          >
            <BsSend className="text-white text-2xl" />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default UserChatPage;
