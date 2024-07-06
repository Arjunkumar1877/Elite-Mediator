// import { useEffect, useState, useRef } from "react";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { IoCall } from "react-icons/io5";
// import { FaVideo } from "react-icons/fa";
// import { HiDotsVertical } from "react-icons/hi";
// import { HiOutlinePaperClip } from "react-icons/hi2";
// import { BsSend } from "react-icons/bs";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useSocket } from "../../contexts/AdminContext";
// import { address } from 'address';
// import { FaRegEdit } from "react-icons/fa";



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
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null | any>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const { currentAdmin } = useSelector((state: any) => state?.admin);
//   const navigate = useNavigate();
//   const  {socket, setIsVideoCall }: any = useSocket();
//   const [editingName, setEditingName] = useState<boolean>(false);
//   const [newName, setNewName] = useState<string>('');
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const conId = query.get("conId");

 
//   useEffect(() => {
//     socket.emit("join room", conId); 
//     const handleIncomingCall = (data: any) => {
//       console.log(data);
//       navigate(`/admin_call_page?conId=${data.conId}&incommingId=${data.incommingId}&callerId=${data.callerId}`);
//     };
    
//     socket.on('incoming-call', handleIncomingCall);

//     return () => {
//       socket.off('incoming-call', handleIncomingCall);
//     };
//   }, [conId, navigate]);

//   const startCall = async (isVideo = false) => {
//     try {
//       setIsVideoCall(isVideo);

//       const res = await fetch("/api/start_call", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           conversationId: conId,
//           callerId: currentAdmin._id,
//           adminId: currentAdmin._id,
//           userId: selectedConversation?.userId._id,
//           caller: "Admin",
//           callType:  isVideo ? 'video' : 'audio',
//           receiver: "User"
//         }),
//       });

//       const data = await res.json();
//       console.log(data);

//       if (data) {
//         socket.emit("incoming-call", { conId, incommingId: currentAdmin._id, adminId: currentAdmin._id, callerId: data._id });
//       }
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`/api/get_messages/${conId}`);
//       setMessages(response.data);
//       setLoading(false);
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setLoading(false);
//     }
//   };

//   const fetchSelectedConversation = async () => {
//     try {
//       const res = await fetch(`/api/selected_conversation/${conId}`);
//       const data = await res.json();
//       setSelectedConversation(data);
//       setNewName(selectedConversation?.userId?.username)
//     } catch (error) {
//       console.error("Error fetching selected conversation:", error);
//     }
//   };

//   console.log(selectedConversation)

//   useEffect(() => {
//     const updateReadCount = async () => {
//       try {
//         const res = await fetch(`/api/update_conversation_unread_count/${conId}`);
//         const data = await res.json();
//         console.log(data);
//       } catch (error) {
//         console.error("Error updating unread count:", error);
//       }
//     };

//     updateReadCount();
//     fetchMessages();
//     fetchSelectedConversation();

//     const handleChatMessage = (msg: any) => {
//       if (msg.conversationId === conId) {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       }
//     };

//     socket.emit("update conversation", currentAdmin._id);
//     socket.on("recieve_message", handleChatMessage);

//     return () => {
//       socket.off("recieve_message", handleChatMessage);
//     };
//   }, [conId, currentAdmin._id, editingName]);

//   const sendMessage = async () => {
//     if (newMessage.trim() === "" || !conId) return;

//     try {
//       const response = await axios.post("/api/send_message", {
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

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const handleChangeName = async(userId: string, newName: string)=>{
//     try {
//       const res = await fetch('/api/edit_unknown_username', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({id: userId, username: newName})
//       });

//       const data:any = await res.json();
//       if(data){
//         console.log("edit success      📀📀📀📀📀📀📀📀📀📀📀📀📀📀")
//         // console.log(data)
//         setEditingName(false);
//         fetchSelectedConversation();
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className=" h-screen bg-gray-50 flex flex-col">
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
//             <span className="text-xl font-bold flex">
//               {
//                 editingName ? (
// <div className="flex justify-center items-center gap-1 md:gap-2">
// <input type="text" value={newName} className="w-[150px] border-2 rounded md:w-[300px] md:p-1" onChange={(e: any)=> setNewName(e.target.value)} /> <button className="text-xs bg-sky-500  text-white px-1 py-1.5 rounded md:p-2 md:text-sm hover:bg-sky-600" onClick={()=> handleChangeName(selectedConversation?.userId._id, newName)} >Save</button>
// </div>
//                 ): (
//                  <div className="flex justify-center gap-2 items-center text-lg md:text-2xl">
//                   {selectedConversation?.userId?.username} { selectedConversation?.propertyId?.userType === 'Unknown' && <FaRegEdit className="cursor-pointer text-sky-500 hover:text-sky-800" onClick={()=> setEditingName(true)} />}
//                  </div>
//                 )
//               }
//             </span>
//           </div>
//           <div className="flex gap-5 items-center text-lg md:text-2xl text-sky-500 ">
//             <IoCall
//               className="cursor-pointer hover:text-sky-800"
//               onClick={() => startCall(false)}
//             />
//             <FaVideo
//               className="cursor-pointer hover:text-sky-800"
//               onClick={() => startCall(true)}
//             />



//             <HiDotsVertical className="cursor-pointer hover:text-sky-800" />
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













import React, { useEffect, useState, useRef } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaVideo, FaRegEdit } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { BsSend } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from "axios";
import { useSelector } from "react-redux";
import { useSocket } from "../../contexts/AdminContext";
import { FaWhatsapp } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCleaningServices } from "react-icons/md";


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
  userId: { _id: string; username: string, phone?: number };
  adminId: string;
  propId: string;
  propertyId: { userType: string };
}

const AdminChatSection: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentAdmin } = useSelector((state: any) => state?.admin);
  const navigate = useNavigate();
  const { socket, setIsVideoCall }: any = useSocket();
  const [editingName, setEditingName] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");

  useEffect(() => {
    socket.emit("join room", conId); 
    const handleIncomingCall = (data: any) => {
      navigate(`/admin_call_page?conId=${data.conId}&incommingId=${data.incommingId}&callerId=${data.callerId}`);
    };
    
    socket.on('incoming-call', handleIncomingCall);

    return () => {
      socket.off('incoming-call', handleIncomingCall);
    };
  }, [conId, navigate, socket]);

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
          callType: isVideo ? 'video' : 'audio',
          receiver: "User"
        }),
      });

      const data = await res.json();
      if (data) {
        socket.emit("incoming-call", { conId, incommingId: currentAdmin._id, adminId: currentAdmin._id, callerId: data._id });
      }
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>(`/api/get_admin_messages/${conId}`);
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
      setNewName(data.userId.username);
    } catch (error) {
      console.error("Error fetching selected conversation:", error);
    }
  };

  useEffect(() => {
    const updateReadCount = async () => {
      try {
        await fetch(`/api/update_conversation_unread_count/${conId}`);
      } catch (error) {
        console.error("Error updating unread count:", error);
      }
    };

    updateReadCount();
    fetchMessages();
    fetchSelectedConversation();

    const handleChatMessage = (msg: Message) => {
      if (msg.conversationId === conId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };

    socket.emit("update conversation", currentAdmin._id);
    socket.on("recieve_message", handleChatMessage);

    return () => {
      socket.off("recieve_message", handleChatMessage);
    };
  }, [conId, currentAdmin._id, socket]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !conId) return;

    try {
      const response = await axios.post<Message>("/api/send_message", {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChangeName = async (userId: string | undefined, newName: string) => {
    try {
      const res = await fetch('/api/edit_unknown_username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId, username: newName })
      });

      const data = await res.json();
      if (data) {
        setEditingName(false);
        fetchSelectedConversation();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClearChat = async()=>{
    console.log("clearing chat clicked")
    const res = await fetch(`/api/clear_admin_chat/${conId}`);
    const data = await res.json();

    if(data.success){
      fetchMessages();
      setShowOptions(false);
      toast("Chats cleared", {
        autoClose: 1000 
    });
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <ToastContainer />
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg relative">
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
            <span className="text-xl font-bold flex">
              {editingName ? (
                <div className="flex justify-center items-center gap-1 md:gap-2">
                  <input
                    type="text"
                    value={newName}
                    className="w-[150px] border-2 rounded md:w-[300px] md:p-1"
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <button
                    className="text-xs bg-sky-500 text-white px-1 py-1.5 rounded md:p-2 md:text-sm hover:bg-sky-600"
                    onClick={() => handleChangeName(selectedConversation?.userId?._id, newName)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-center gap-2 items-center text-lg md:text-2xl">
                  {selectedConversation?.userId?.username}
                  {selectedConversation?.propertyId?.userType === 'Unknown' && (
                    <FaRegEdit className="cursor-pointer text-sky-500 hover:text-sky-800" onClick={() => setEditingName(true)} />
                  )}
                </div>
              )}
            </span>
          </div>
          <div className="flex gap-5 items-center text-lg md:text-2xl text-sky-500">
            <IoCall className="cursor-pointer hover:text-sky-800" onClick={() => startCall(false)} />
            <FaVideo className="cursor-pointer hover:text-sky-800" onClick={() => startCall(true)} />
            <HiDotsVertical className="cursor-pointer hover:text-sky-800 hover:bg-slate-200 rounded-full hover:text-2xl hover:p-1 md:hover:text-3xl" onClick={()=> setShowOptions(!showOptions)} />

          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.senderModel === "Admin" ? "justify-end" : "justify-start"} gap-3`}
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
                    <span>{formatTime(message.createdAt)}</span>
                    <span>{message.senderModel === "Admin" ? "You" : message.senderName}</span>
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
          <div className="p-2 rounded-full bg-sky-500 ml-3 cursor-pointer" onClick={sendMessage}>
            <BsSend className="text-white text-2xl" />
          </div>
        </div>

       {
        showOptions &&  <div className="w-34 h-39 absolute bg-slate-700 opacity-70 right-14 rounded top-12 flex flex-col p-3 gap-4 md:w-40">
   {
     selectedConversation?.propertyId.userType !== "Unknown" &&   <>
       <a href={`https://wa.me/${selectedConversation?.userId?.phone}`}>
     <div className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg"><FaWhatsapp className="text-green-600" /> <span className="text-sm"> Whats app</span></div>
     </a>
     <a href={`tel:${selectedConversation?.userId?.phone}`}>
     <div className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg"><IoCall className="text-green-600" /> <span className="text-sm">{selectedConversation?.userId.phone}</span></div>

     </a>

     </>
   }
        <div className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg" onClick={handleClearChat} ><MdCleaningServices className="text-red-600" /> <span className="text-sm">Clear chat</span></div>
      </div>
       }

      </div>
    </div>
  );
};

export default AdminChatSection;


