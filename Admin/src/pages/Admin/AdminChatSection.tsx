import { useEffect, useState, useRef } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { BsSend } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from "axios";
import { useSelector } from "react-redux";
import { useSocket } from "../../contexts/AdminContext";

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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentAdmin } = useSelector((state: any) => state?.admin);
  const navigate = useNavigate();
  const  {socket, setIsVideoCall }: any = useSocket();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");
 
  useEffect(() => {
    socket.emit("join room", conId); 
    const handleIncomingCall = (data: any) => {
      console.log(data);
      navigate(`/admin_call_page?conId=${data.conId}&name=${data.name}&callerId=${data.callerId}`);
    };
    
    socket.on('incoming-call', handleIncomingCall);

    return () => {
      socket.off('incoming-call', handleIncomingCall);
    };
  }, [conId, navigate]);

  const startCall = async (isVideo = false) => {
    try {
      setIsVideoCall(isVideo);

      const res = await fetch("/api/start_call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: conId,
          callerId: currentAdmin._id,
          adminId: currentAdmin._id,
          userId: selectedConversation?.userId._id,
          caller: "Admin",
          callType:  isVideo ? 'video' : 'audio',
          receiver: "User"
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data) {
        socket.emit("incoming-call", { conId, name: currentAdmin.username, adminId: currentAdmin._id, callerId: data._id });
      }
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const handleConversationSelect = async () => {
    try {
      const response = await axios.get(`/api/get_messages/${conId}`);
      setMessages(response.data);
      setLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  const fetchSelectedConversation = async () => {
    try {
      const res = await fetch(`/api/selected_conversation/${conId}`);
      const data = await res.json();
      setSelectedConversation(data);
    } catch (error) {
      console.error("Error fetching selected conversation:", error);
    }
  };

  console.log(selectedConversation?.userId._id)

  useEffect(() => {
    const updateReadCount = async () => {
      try {
        const res = await fetch(`/api/update_conversation_unread_count/${conId}`);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error updating unread count:", error);
      }
    };

    updateReadCount();
    handleConversationSelect();
    fetchSelectedConversation();

    const handleChatMessage = (msg: any) => {
      if (msg.conversationId === conId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };

    socket.emit("update conversation", currentAdmin._id);
    socket.on("recieve_message", handleChatMessage);

    return () => {
      socket.off("recieve_message", handleChatMessage);
    };
  }, [conId, currentAdmin._id]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !conId) return;

    try {
      const response = await axios.post("/api/send_message", {
        conversationId: conId,
        senderId: currentAdmin._id,
        senderModel: "Admin",
        text: newMessage,
      });

      socket.emit("chat message", response.data, conId, currentAdmin._id);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Automatically scroll to the latest message when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return <div>Loading...</div>;
  }





  return (
    <div className="pt-16 h-screen bg-gray-50 flex flex-col">
      <ToastContainer />
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center px-5 py-2 border-b-2">
          <div className="flex gap-5 items-center">
            <Link to={"/chat_list"}>
              <MdArrowBackIosNew className="text-xl cursor-pointer" />
            </Link>
            <img
              src="/public/userIcon.webp"
              className="w-10 h-10 rounded-full"
              alt="User"
            />
            <span className="text-xl font-bold">
              {selectedConversation?.userId?.username}
            </span>
          </div>
          <div className="flex gap-5 items-center text-2xl text-sky-500">
            <IoCall
              className="cursor-pointer"
              onClick={() => startCall(false)}
            />
            <FaVideo
              className="cursor-pointer"
              onClick={() => startCall(true)}
            />



            <HiDotsVertical className="cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderModel === "Admin"
                    ? "justify-end"
                    : "justify-start"
                } gap-3`}
              >
                {message.senderModel !== "Admin" && (
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
                      {message.senderModel === "Admin"
                        ? "You"
                        : message.senderName}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-100 text-sm break-words">
                    {message.text}
                  </div>
                </div>
                {message.senderModel === "Admin" && (
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
      </div>
    </div>
  );
};

export default AdminChatSection;




























// import { useEffect, useState, useRef } from "react";
// import { MdArrowBackIosNew, MdCallEnd } from "react-icons/md";
// import { IoCall } from "react-icons/io5";
// import { FaUserAlt, FaVideo } from "react-icons/fa";
// import { HiDotsVertical } from "react-icons/hi";
// import { HiOutlinePaperClip, HiSpeakerXMark } from "react-icons/hi2";
// import { BsSend } from "react-icons/bs";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useSocket } from "../../contexts/AdminContext";
// import AdminCallPage from "../../component/Admin/AdminCallPage";
// import { IoIosMic } from "react-icons/io";

// interface Message {
//   _id: string;
//   conversationId: string;
//   senderId: string;
//   senderModel: "User" | "Admin";
//   text: string;
//   createdAt: string;
//   senderName?: string;
// }

// interface Conversation {
//   _id: string;
//   userId: any;
//   adminId: string;
//   propId: string;
// }

// const AdminChatSection: React.FC = () => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [callActive, setCallActive] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [videoCall, setVideoCall] = useState<boolean>(false);
//   const [incomminCall, setIncommingCall] = useState<boolean>(false);
//   const [acceptedCall, setAcceptedCall] = useState<boolean>();
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const { currentAdmin } = useSelector((state: any) => state?.admin);
//   const params = useParams();
//   const navigate = useNavigate();
//   const  {socket, localVideoRef, remoteVideoRef , setIsVideoCall, isVideoCall}: any = useSocket();
//   console.log(socket);
 
//   const conId = params?.id;
// // const localVideoRef: any = useRef<HTMLVideoElement>(null);
// // const remoteVideoRef: any = useRef<HTMLVideoElement>(null);
// const pc = useRef<RTCPeerConnection>(
//   new RTCPeerConnection({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   })
// );

// useEffect(() => {
//   socket.emit("join room", conId);

//   const handleOffer = async (offer: any) => {
//     if (offer.name !== currentAdmin.username) {
//       confirmAlert({
//         title: 'Incoming Call',
//         message: `You have a call from ${offer.name}. Do you want to accept the call?`,
//         buttons: [
//           {
//             label: 'Yes',
//             onClick: async () => {
//               setCallActive(true);
//               setIsVideoCall(offer.isVideo);
//               const constraints = { audio: true, video: offer.isVideo };
//               const stream = await navigator.mediaDevices.getUserMedia(constraints);
//               stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
  
//               if (localVideoRef.current) {
//                 localVideoRef.current.srcObject = stream;
//               }
  
//               await pc.current.setRemoteDescription(new RTCSessionDescription(offer.offer));
//               const answer = await pc.current.createAnswer();
//               await pc.current.setLocalDescription(answer);
//               socket.emit("webrtc-answer", { room: conId, answer, name: currentAdmin.username });
//             }
//           },
//           {
//             label: 'No',
//             onClick: () => {
//               socket.emit("webrtc-disconnect", conId);
//             }
//           }
//         ]
//       });
//     }
//   };
//   const handleAnswer = async (data: any) => {
//     const { name, answer } = data;
//     if (currentAdmin.username !== name) {
//       if (pc.current.signalingState === "have-local-offer") {
//         try {
//           await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
//         } catch (error) {
//           console.error("Error setting remote description:", error);
//         }
//       } else {
//         console.warn("Signaling state is not 'have-local-offer'. Current state: ", pc.current.signalingState);
//       }
//     }
//   };

//   const handleIceCandidate = async (candidate: any) => {
//     try {
//       await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//     } catch (error) {
//       console.error("Error adding received ice candidate", error);
//     }
//   };

//   const handleDisconnect = () => {
//     setCallActive(false);

//     if (localVideoRef.current && localVideoRef.current.srcObject) {
//       const localStream = localVideoRef.current.srcObject as MediaStream;
//       localStream.getTracks().forEach((track) => track.stop());
//       localVideoRef.current.srcObject = null;
//     }

//     if (pc.current) {
//       pc.current.getSenders().forEach((sender) => sender.track && sender.track.stop());
//       pc.current.close();
//       pc.current = new RTCPeerConnection({
//         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//       });
//     }

//     if (remoteVideoRef.current) {
//       remoteVideoRef.current.srcObject = null;
//     }

//     socket.off("webrtc-offer", handleOffer);
//     socket.off("webrtc-answer", handleAnswer);
//     socket.off("webrtc-ice-candidate", handleIceCandidate);
//   };

//   socket.on("webrtc-offer", handleOffer);
//   socket.on("webrtc-answer", handleAnswer);
//   socket.on("webrtc-ice-candidate", handleIceCandidate);
//   socket.on("webrtc-disconnect", handleDisconnect);

//   pc.current.onicecandidate = (event) => {
//     if (event.candidate) {
//       socket.emit("webrtc-ice-candidate", { room: conId, candidate: event.candidate });
//     }
//   };

//   pc.current.ontrack = (event) => {
//     if (event.streams && event.streams.length > 0) {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     }
//   };

//   return () => {
//     socket.off("webrtc-offer", handleOffer);
//     socket.off("webrtc-answer", handleAnswer);
//     socket.off("webrtc-ice-candidate", handleIceCandidate);
//     socket.off("webrtc-disconnect", handleDisconnect);
//   };
// }, [conId, currentAdmin.username]);

// const startCall = async (isVideo = false) => {
//   try {
//     setVideoCall(isVideo);
//     setCallActive(true);
//     setIsVideoCall(isVideo);

//     const constraints = { audio: true, video: isVideo };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//     if (localVideoRef.current) {
//       localVideoRef.current.srcObject = stream;
//     }

//     const offer = await pc.current.createOffer();
//     await pc.current.setLocalDescription(offer);
//     socket.emit("webrtc-offer", { name: currentAdmin.username, room: conId, isVideo, offer });
//   } catch (error) {
//     console.error("Error starting call:", error);
//   }
// };



// // ------------------| END AN AUDIO OR VIDEO CALL ----------------------------------------------------------------------------------------------------------------------------->  
// const handleCutheCall = () => {
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


//   // Clear the remote video element's source
//   if (remoteVideoRef.current) {
//     remoteVideoRef.current.srcObject = null;
//   }
// };

// // ------------------| GET MESSAGES OF THE PERTICULAR CONVERSATION --------------------------------------------------------------------------------------------------------->
// const handleConversationSelect = async () => {
//   try {
//     const response = await axios.get(`/user/get_messages/${params.id}`);
//     setMessages(response.data);
//     socket.emit("join room", conId);
//     setLoading(false);
//     scrollToBottom();
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     setLoading(false);
//   }
// };

// // ------------------| GET THE PERTICULAR CONVERSATION DATA ------------------------------------------------------------------------------------------------------------------>
// const fetchselectedConversation = async () => {
//   try {
//     const res = await fetch(`/api/selected_conversation/${conId}`);
//     const data = await res.json();
//     setSelectedConversation(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // ------------------| USE EFFECT FOR HANDLING MESSAGES RECIEVE, UPDATE UNREAD MESSAGE COUNT TO ZERO AND TO UPDATE THE REALTIME MESSAGES --------------------------------------------------------------------------------------------------------->
//   useEffect(() => {

//     const updateReadCount = async () => {
//       const res = await fetch(`/api/update_conversation_unread_count/${conId}`);
//       const data = await res.json();
//       console.log(data);
//     };

//     updateReadCount();
//     handleConversationSelect();
//     fetchselectedConversation();

//     const handleChatMessage = (msg: Message) => {
//       if (msg.conversationId === conId) {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       }
//     };
//     socket.emit("update conversation", currentAdmin._id);
//     socket.on("recieve_message", handleChatMessage);

//     return () => {
//       socket.off("recieve_message", handleChatMessage);
//     };
//   }, [conId]);

// // ------------------| SEND A MESSAGE TO THE USER AND UPDATE THE TO THE DATABASE WITH THE ADMIN ID AND CONVERSATIONID ----------------------------------------------------------------------------------------------------------------------------->  
//   const sendMessage = async () => {
//     if (newMessage.trim() === "" || !conId) return;

//     try {
//       const response = await axios.post<Message>("/api/send_message", {
//         conversationId: conId,
//         senderId: currentAdmin._id,
//         senderModel: "Admin",
//         text: newMessage,
//       });

//       socket.emit("chat message", response.data, conId, currentAdmin._id);
//       setNewMessage("");
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

// // ------------------| USE EFFECT FOR AUTOMATTICALLY SCROLLING TO THE LATEST MESSSAGE DOWN THE CHAT ----------------------------------------------------------------------------------------------------------------------------->  
// const scrollToBottom = () => {
//   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// };  


// useEffect(() => {
    
//     scrollToBottom();
//   }, [messages]);




//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="pt-16 h-screen bg-gray-50 flex flex-col">
//       <ToastContainer />
//       <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
//         <div className="flex justify-between items-center px-5 py-2 border-b-2">
//           <div className="flex gap-5 items-center">
//             <Link to={"/chat_list"}>
//               <MdArrowBackIosNew className="text-xl cursor-pointer" />
//             </Link>
//             <img
//               src="/public/userIcon.webp"
//               className="w-10 h-10 rounded-full"
//               alt="User"
//             />
//             <span className="text-xl font-bold">
//               {selectedConversation?.userId?.username}
//             </span>
//           </div>
//           <div className="flex gap-5 items-center text-2xl text-sky-500">
//             <IoCall
//               className="cursor-pointer"
//               onClick={() => startCall(false)}
//             />
//             <FaVideo
//               className="cursor-pointer"
//               onClick={() => startCall(true)}
//             />

//             <HiDotsVertical className="cursor-pointer" />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto py-4">
//           <div className="flex flex-col gap-4 px-5">
//             {messages.map((message) => (
//               <div
//                 key={message._id}
//                 className={`flex ${
//                   message.senderModel === "Admin"
//                     ? "justify-end"
//                     : "justify-start"
//                 } gap-3`}
//               >
//                 {message.senderModel !== "Admin" && (
//                   <img
//                     src="/public/userIcon.webp"
//                     alt="User"
//                     className="w-10 h-10 rounded-full"
//                   />
//                 )}
//                 <div className="flex flex-col max-w-[300px] md:max-w-[350px] lg:max-w-[650px]">
//                   <div className="flex justify-between text-xs text-slate-400">
//                     <span>
//                       {new Date(message.createdAt).toLocaleTimeString()}
//                     </span>
//                     <span>
//                       {message.senderModel === "Admin"
//                         ? "You"
//                         : message.senderName}
//                     </span>
//                   </div>
//                   <div className="p-3 rounded-xl bg-sky-100 text-sm break-words">
//                     {message.text}
//                   </div>
//                 </div>
//                 {message.senderModel === "Admin" && (
//                   <img
//                     src="/public/userIcon.webp"
//                     alt="User"
//                     className="w-10 h-10 rounded-full"
//                   />
//                 )}
//               </div>
//             ))}
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
//   isVideoCall ? <div className="flex flex-col justify-center items-center ">
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
//     <button onClick={handleCutheCall} className=" flex justify-center items-center  w-20 h-20 bg-red-400 rounded-full hover:bg-red-800">
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

// export default AdminChatSection;
