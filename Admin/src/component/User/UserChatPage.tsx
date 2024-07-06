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
import { useSocket } from "../../contexts/AdminContext";
import { MdCleaningServices } from "react-icons/md";
// import { toast } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";

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
  const { setIsVideoCall }: any = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");
  const [showOptions, setShowOptions] = useState<boolean>(false);



  useEffect(() => {
    socket.emit("join room", conId);
    socket.on("incoming-call", (data: any) => {
      console.log(data);
      navigate(`/call_page_user?conId=${data.conId}&incommingId=${data.incommingId}&callerId=${data.callerId}`);
    });
  }, [conId, currentUser.username]);

  const startCall = async (isVideo = false) => {
    try {
      setIsVideoCall(isVideo);
      const res = await fetch("/user/start_call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: currentUser.conversationId,
          adminId: currentUser.adminId._id,
          userId: currentUser._id,
          caller: "User",
          callType: isVideo ? 'video' : 'audio',
          receiver: "Admin"
        }),
      });

      const data:any = await res.json();
      console.log(data);

      if(data){
        socket.emit("incoming-call", {
          conId,
          incommingId: currentUser._id,
          adminId: currentUser.adminId,
          callerId: data._id
        })
      };
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (msg: Message) => {
      if (msg.conversationId === conId) {
        dispatch(setMessages([...messages, msg]));
      }
    });

    return () => {
      socket.off("recieve_message");
    };
  }, [messages, dispatch, conId]);

  const fetchMessages = async () => {
    try {
      const res: any = await axios.get(`/user/get_user_messages/${conId}`);
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
      socket.emit("notify", currentUser.adminId);

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

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString([], options);
  };


  const handleClearChat = async()=>{
    const res = await fetch(`/user/clear_user_chat/${conId}`);
    const data = await res.json();

    if(data.success){
      fetchMessages();
      setShowOptions(false);
      toast("Chats cleared", {
        duration: 1000 
    });
    }
  }

  console.log(currentUser);

  return (
    <div className="pt-1 h-screen bg-gray-50 flex flex-col">
      <Toaster />
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center px-5 py-3 border-b-2">
          <div className="flex gap-5 items-center">
            <img
              src="/public/userIcon.webp"
              className="w-10 h-10 rounded-full"
              alt="User"
            />
            {currentUser && (
              <span className="text-xl font-bold">
                {currentUser?.adminId?.username}
              </span>
            )}
          </div>
          <div className="flex gap-5 items-center text-lg md:text-2xl text-sky-500">
            <IoCall
              className="cursor-pointer hover:text-sky-800"
              onClick={() => startCall(false)}
            />
            <FaVideo
              className="cursor-pointer hover:text-sky-800"
              onClick={() => startCall(true)}
            />
            <HiDotsVertical className="cursor-pointer hover:text-sky-800 hover:bg-slate-200 rounded-full hover:text-2xl hover:p-1 md:hover:text-3xl"  onClick={()=> setShowOptions(!showOptions)}  />
            
            <FiLogOut className="cursor-pointer " onClick={handleSignOut} />
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
                        {formatTime(message.createdAt)}
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

        {
        showOptions &&  <div className="w-34 h-39 absolute bg-slate-700 opacity-70 right-24 rounded top-16 flex flex-col p-3 gap-4 md:w-40">
        <div className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg" onClick={handleClearChat}><MdCleaningServices className="text-red-600" /> <span className="text-sm">Clear chat</span></div>
      </div>
       }


      </div>
    </div>
  );
};

export default UserChatPage;

// import { useEffect, useState, useRef } from "react";
// import { BsSend } from "react-icons/bs";
// import { FaUserAlt, FaVideo } from "react-icons/fa";
// import { HiDotsVertical, HiOutlinePaperClip } from "react-icons/hi";
// import { IoCall } from "react-icons/io5";
// import { FiLogOut } from "react-icons/fi";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { signoutSuccess, setMessages } from "../../redux/user/UserSlice";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// import io from "socket.io-client";
// import { HiSpeakerXMark } from "react-icons/hi2";
// import { IoIosMic } from "react-icons/io";
// import { MdCallEnd } from "react-icons/md";

// const socket = io("http://localhost:7000");

// interface Message {
//   _id: string;
//   conversationId: string;
//   senderId: string;
//   senderModel: "User" | "Admin";
//   text: string;
//   createdAt: string;
//   senderName?: string;
// }

// const UserChatPage: React.FC = () => {
//   const [newMessage, setNewMessage] = useState<string>("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const { currentUser, messages } = useSelector((state: any) => state.user);
//   const [callActive, setCallActive] = useState<boolean>(false)
//   const [videoCall, setVideoCall] = useState<boolean>(false);
//   const [incomminCall, setIncommingCall] = useState<boolean>(false);
//   const [acceptedCall, setAcceptedCall] = useState<boolean>();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const conId = query.get("conId");
//   const localVideoRef: any = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef: any= useRef<HTMLVideoElement>(null);
//   const pc = useRef<RTCPeerConnection>(
//     new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     })
//   );

//   useEffect(() => {
//     socket.emit("join room", conId);

//     const handleOffer = async (offer: any) => {
//       if (offer.incommingId !== currentUser.username) {
//         confirmAlert({
//           title: 'Incoming Call',
//           message: `You have a call from ${offer.incommingId}. Do you want to accept the call?`,
//           buttons: [
//             {
//               label: 'Yes',
//               onClick: async () => {
//                 setCallActive(true);
//                 const constraints = { audio: true, video: offer.isVideo };
//                 const stream = await navigator.mediaDevices.getUserMedia(constraints);
//                 stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//                 if (localVideoRef.current) {
//                   localVideoRef.current.srcObject = stream;
//                 }

//                 await pc.current.setRemoteDescription(new RTCSessionDescription(offer.offer));
//                 const answer = await pc.current.createAnswer();
//                 await pc.current.setLocalDescription(answer);
//                 socket.emit("webrtc-answer", { room: conId, answer, incommingId: currentUser.username });
//               }
//             },
//             {
//               label: 'No',
//               onClick: () => {
//                 socket.emit("webrtc-disconnect", conId);
//               }
//             }
//           ]
//         });
//       }
//     };
//     const handleAnswer = async (data: any) => {
//       const { incommingId, answer } = data;
//       if (currentUser.username !== incommingId) {
//         if (pc.current.signalingState === "have-local-offer") {
//           try {
//             await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
//           } catch (error) {
//             console.error("Error setting remote description:", error);
//           }
//         } else {
//           console.warn("Signaling state is not 'have-local-offer'. Current state: ", pc.current.signalingState);
//         }
//       }
//     };

//     const handleIceCandidate = async (candidate: any) => {
//       try {
//         await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//       } catch (error) {
//         console.error("Error adding received ice candidate", error);
//       }
//     };

//     const handleDisconnect = () => {
//       setCallActive(false);

//       if (localVideoRef.current && localVideoRef.current.srcObject) {
//         const localStream = localVideoRef.current.srcObject as MediaStream;
//         localStream.getTracks().forEach((track) => track.stop());
//         localVideoRef.current.srcObject = null;
//       }

//       if (pc.current) {
//         pc.current.getSenders().forEach((sender) => sender.track && sender.track.stop());
//         pc.current.close();
//         pc.current = new RTCPeerConnection({
//           iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//         });
//       }

//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = null;
//       }

//       socket.off("webrtc-offer", handleOffer);
//       socket.off("webrtc-answer", handleAnswer);
//       socket.off("webrtc-ice-candidate", handleIceCandidate);
//     };

//     socket.on("webrtc-offer", handleOffer);
//     socket.on("webrtc-answer", handleAnswer);
//     socket.on("webrtc-ice-candidate", handleIceCandidate);
//     socket.on("webrtc-disconnect", handleDisconnect);

//     pc.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("webrtc-ice-candidate", { room: conId, candidate: event.candidate });
//       }
//     };

//     pc.current.ontrack = (event) => {
//       if (event.streams && event.streams.length > 0) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return () => {
//       socket.off("webrtc-offer", handleOffer);
//       socket.off("webrtc-answer", handleAnswer);
//       socket.off("webrtc-ice-candidate", handleIceCandidate);
//       socket.off("webrtc-disconnect", handleDisconnect);
//     };

//   }, [conId, currentUser.username]);

//   const startCall = async (isVideo = false) => {
//     try {
//       setVideoCall(isVideo);
//       setCallActive(true);

//       const constraints = { audio: true, video: isVideo };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       const offer = await pc.current.createOffer();
//       await pc.current.setLocalDescription(offer);
//       socket.emit("webrtc-offer", { incommingId: currentUser.username, room: conId, isVideo, adminId: currentUser.adminId, offer });
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

// // ------------------| END AN AUDIO OR VIDEO CALL ----------------------------------------------------------------------------------------------------------------------------->
// const handleCutTheCall = () => {
//   setCallActive(false);

//   // Stop all local media tracks
//   if (localVideoRef.current && localVideoRef.current.srcObject) {
//     const localStream = localVideoRef.current.srcObject as MediaStream;
//     localStream.getTracks().forEach((track) => track.stop());
//     localVideoRef.current.srcObject = null;
//   }

//   // Close the RTCPeerConnection
//   if (pc.current) {
//     // Stop all tracks added to the peer connection
//     pc.current
//       .getSenders()
//       .forEach((sender) => sender.track && sender.track.stop());
//     pc.current.close();
//   }
//   socket.emit("webrtc-disconnect", conId);

//   // Remove socket event listeners
//   socket.off("webrtc-offer");
//   socket.off("webrtc-answer");
//   socket.off("webrtc-ice-candidate");
//   // navigate(`/admin_chat/${conId}`);

//   // Clear the remote video element's source
//   if (remoteVideoRef.current) {
//     remoteVideoRef.current.srcObject = null;
//   }
// };

//   useEffect(() => {
//     socket.on("recieve_message", (msg: Message) => {
//       if (msg.conversationId === conId) {
//         dispatch(setMessages([...messages, msg]));
//       }
//     });

//     return () => {
//       socket.off('recieve_message');
//     };
//   }, [messages, dispatch, conId]);

//   const fetchMessages = async () => {
//     try {
//       const res: any = await axios.get(`/user/get_messages/${conId}`);
//       console.log(res);
//       console.log(res.data);

//       dispatch(setMessages(res.data));
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     if (conId) {
//       socket.emit("join room", conId);
//       fetchMessages();
//     }

//     if (currentUser) {
//       navigate(`/chat_user?conId=${conId}`);
//     } else {
//       navigate("/");
//     }
//   }, [currentUser, conId, navigate]);

//   const sendMessage = async () => {
//     if (newMessage.trim() === "" || !conId) return;

//     try {
//       const response = await axios.post<Message>("/user/send_message", {
//         conversationId: conId,
//         senderId: currentUser._id,
//         senderModel: "User",
//         text: newMessage,
//       });

//       socket.emit("chat message", response.data, conId, currentUser.adminId);
//       socket.emit("update conversation", currentUser.adminId);
//       setNewMessage("");
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSignOut = () => {
//     dispatch(signoutSuccess());
//     navigate("/");
//   };

//   console.log(messages);

//   return (
//     <div className="pt-1 h-screen bg-gray-50 flex flex-col">
//       <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
//         <div className="flex justify-between items-center px-5 py-3 border-b-2">
//           <div className="flex gap-5 items-center">
//             <img
//               src="/public/userIcon.webp"
//               className="w-10 h-10 rounded-full"
//               alt="User"
//             />
//             {currentUser && (
//               <span className="text-xl font-bold">{currentUser.username}</span>
//             )}
//           </div>
//           <div className="flex gap-5 items-center text-2xl text-sky-500">
//             <IoCall className="cursor-pointer" onClick={() => startCall(false)} />
//             <FaVideo className="cursor-pointer" onClick={() => startCall(true)} />
//             <HiDotsVertical className="cursor-pointer" />
//             <FiLogOut className="cursor-pointer" onClick={handleSignOut} />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto py-4">
//           <div className="flex flex-col gap-4 px-5">
//             {messages?.length > 0 &&
//               messages.map((message: Message) => (
//                 <div
//                   key={message._id}
//                   className={`flex ${
//                     message.senderModel === "User"
//                       ? "justify-end"
//                       : "justify-start"
//                   } gap-3`}
//                 >
//                   {message.senderModel !== "User" && (
//                     <img
//                       src="/public/userIcon.webp"
//                       alt="User"
//                       className="w-10 h-10 rounded-full"
//                     />
//                   )}
//                   <div className="flex flex-col max-w-[300px] md:max-w-[350px] lg:max-w-[650px]">
//                     <div className="flex justify-between text-xs text-slate-400">
//                       <span>
//                         {new Date(message.createdAt).toLocaleTimeString()}
//                       </span>
//                       <span>
//                         {message.senderModel === "User"
//                           ? "You"
//                           : message.senderName || "Admin"}
//                       </span>
//                     </div>
//                     <div className="p-3 rounded-xl bg-sky-100 text-sm overflow-hidden break-words">
//                       {message.text}
//                     </div>
//                   </div>
//                   {message.senderModel === "User" && (
//                     <img
//                       src="/public/userIcon.webp"
//                       alt="User"
//                       className="w-10 h-10 rounded-full"
//                     />
//                   )}
//                 </div>
//               ))}
//             <div ref={messagesEndRef}></div>
//           </div>
//         </div>

//         {callActive && (
//      <div className="flex flex-col gap-y-16 p-9">

//      <div className="flex flex-col gap-5 mb-10">

//        <div className="flex justify-center">
//          <h3>Connected</h3>
//        </div>

//        <div className="flex justify-center">

// {
//   callActive ? <div className="flex flex-col justify-center items-center ">
//   <video
//     ref={localVideoRef}
//     autoPlay
//     muted
//     className="w-1/4 absolute bottom-24 z-10 right-24  md:right-9 md:-bottom-4 md:w-[250px]"
//   ></video>
//   <video
//     ref={remoteVideoRef}
//     autoPlay
//     className="w-1/1 relative md:w-[900px] md:h-[600px]"
//   ></video>
// </div>  : (
//     <div className="w-52 h-52 bg-green-300 rounded-full flex justify-center items-center">
//     <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
//       <FaUserAlt className="text-white text-9xl p-2" />
//     </div>
//   </div>
// )
// }

//        </div>

//        <div className="flex justify-center">
//          <div className="flex flex-col">
//            <h2 className="font-bold text-3xl text-sky-500">
//              Arjun kumar vs
//            </h2>
//            <p className="text-zinc-400 text-center font-semibold">Visitor</p>
//          </div>
//        </div>

//      </div>

//     <div className="flex flex-col gap-3">
//     <div className="flex justify-between px-16">
//        <button className="flex justify-center items-center ">
//          {/* <HiSpeakerWave className="text-zinc-500 text-6xl" /> */}
//          <HiSpeakerXMark className="text-zinc-500 text-6xl" />
//        </button>
//        <button className=" flex justify-center items-center  ">
//          {/* <IoIosMicOff className="text-zinc-500 text-6xl" /> */}
//          <IoIosMic className="text-zinc-500 text-6xl" />
//        </button>
//      </div>

//     <div className="flex justify-center">
//     <button onClick={handleCutTheCall} className=" flex justify-center items-center  w-20 h-20 bg-red-400 rounded-full hover:bg-red-800">
//          <MdCallEnd className="text-white text-5xl" />
// </button>
//     </div>

//     </div>

//    </div>
//         )}
//         <div className="flex justify-between items-center px-5 py-2 bg-sky-200 rounded-lg mt-2">
//           <img
//             src="/public/userIcon.webp"
//             className="w-10 h-10 rounded-full"
//             alt="User"
//           />
//           <input
//             type="text"
//             placeholder="Write something..."
//             className="flex-1 mx-3 p-2 rounded-lg border bg-sky-100 border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <HiOutlinePaperClip className="text-sky-500 text-2xl cursor-pointer" />
//           <div
//             className="p-2 rounded-full bg-sky-500 ml-3 cursor-pointer"
//             onClick={sendMessage}
//           >
//             <BsSend className="text-white text-2xl" />
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default UserChatPage;
