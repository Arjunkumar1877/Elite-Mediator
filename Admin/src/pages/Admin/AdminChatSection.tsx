import { useEffect, useState, useRef } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { BsSend } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:7000');

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderModel: "User" | "Admin";
  text: string;
  createdAt: string;
  senderName?: string;
}

interface Conversation {
  _id: string;
  userId: any;
  adminId: string;
  propId: string;
}

const AdminChatSection: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [callActive, setCallActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentAdmin } = useSelector((state: any) => state?.admin);
  const params = useParams();
  const conId = params?.id;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pc = useRef<RTCPeerConnection>(new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  }));




// console.log(conId)
  const handleConversationSelect = async () => {
    try {
      const response = await axios.get(`/user/get_messages/${params.id}`);
      setMessages(response.data); 
      socket.emit('join room', conId);
      setLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  const fetchselectedConversation = async()=>{
    try {
      const res = await fetch(`/api/selected_conversation/${conId}`);
      const data = await res.json();
      setSelectedConversation(data)
    } catch (error) {
      console.log(error)
    }
  }


  const startCall = async (isVideo = false) => {
    const constraints = { audio: true, video: isVideo };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    socket.emit("webrtc-offer", { room: conId, offer });
  };

  useEffect(() => {
    socket.on("webrtc-offer", async (offer) => {
      setCallActive(true)

      console.log("Received WebRTC offer");
      if (pc.current.signalingState !== "stable") {
        console.warn("Signaling state is not stable. Current state: ", pc.current.signalingState);
        return;
      }
      await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      socket.emit("webrtc-answer", { room: conId, answer });
    });

    socket.on("webrtc-answer", async (answer) => {
      console.log("Received WebRTC answer");
      console.log(answer)
      if (pc.current.signalingState !== "have-local-offer") {
        console.warn("Signaling state is not 'have-local-offer'. Current state: ", pc.current.signalingState);
        return;
      }
      await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("webrtc-ice-candidate", async (candidate) => {
      try {
        await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      startCall(true)

      } catch (e) {
        console.error("Error adding received ice candidate", e);
      }
    });

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
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
    };
  }, [conId]);




  useEffect(() => {
    const updateReadCount = async()=>{
      const res = await fetch(`/api/update_conversation_unread_count/${conId}`);
      const data = await res.json();
      console.log(data);
    }

    updateReadCount()

    socket.emit('join room', conId);
    handleConversationSelect();
  }, [conId]);

  useEffect(() => {
    fetchselectedConversation()

    const handleChatMessage = (msg: Message) => {
      if (msg.conversationId === conId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };
    socket.emit('update conversation', currentAdmin._id);
    socket.on('recieve_message', handleChatMessage);

    return () => {
      socket.off('recieve_message', handleChatMessage);
    };
  }, [conId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !conId) return;

    try {
      const response = await axios.post<Message>('/api/send_message', {
        conversationId: conId,
        senderId: currentAdmin._id,
        senderModel: "Admin",
        text: newMessage
      });

      socket.emit('chat message', response.data, conId, currentAdmin._id);
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





  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(selectedConversation)




  console.log(localVideoRef)


  return (
    <div className="pt-16 h-screen bg-gray-50 flex flex-col">
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center px-5 py-2 border-b-2">
          <div className="flex gap-5 items-center">
            <Link to={'/chat_list'}>
              <MdArrowBackIosNew className="text-xl cursor-pointer" />
            </Link>
            <img src="/public/userIcon.webp" className="w-10 h-10 rounded-full" alt="User" />
            <span className="text-xl font-bold">{selectedConversation?.userId?.username}</span>
          </div>
          <div className="flex gap-5 items-center text-2xl text-sky-500">
          <IoCall className="cursor-pointer" onClick={() => startCall(false)} />
          <FaVideo className="cursor-pointer" onClick={() => startCall(true)} />
            <HiDotsVertical className="cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            {messages.map((message) => (
              <div key={message._id} className={`flex ${message.senderModel === "Admin" ? "justify-end" : "justify-start"} gap-3`}>
                {message.senderModel !== "Admin" && (
                  <img src="/public/userIcon.webp" alt="User" className="w-10 h-10 rounded-full" />
                )}
                <div className="flex flex-col max-w-[300px] md:max-w-[350px] lg:max-w-[650px]">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                    <span>{message.senderModel === "Admin" ? "You" : message.senderName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-100 text-sm break-words">
                    {message.text}
                  </div>
                </div>
                {message.senderModel === "Admin" && (
                  <img src="/public/userIcon.webp" alt="User" className="w-10 h-10 rounded-full" />
                )}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
       {
        callActive && <div className="flex justify-center items-center">
        <video ref={localVideoRef} autoPlay muted className="w-1/4"></video>
        <video ref={remoteVideoRef} autoPlay className="w-1/2"></video>
      </div>
       }
        <div className="flex justify-between items-center px-5 py-2 bg-sky-200 rounded-lg mt-2">
          <img src="/public/userIcon.webp" className="w-10 h-10 rounded-full" alt="User" />
          <input
            type="text"
            placeholder="Write something..."
            className="flex-1 mx-3 p-2 rounded-lg border bg-sky-100 border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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

export default AdminChatSection;
