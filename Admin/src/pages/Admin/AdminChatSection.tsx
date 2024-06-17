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
  userId: string;
  adminId: string;
  propId: string;
}

const AdminChatSection: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentAdmin } = useSelector((state: any) => state?.admin);
  const params = useParams();
console.log(params.id + "")
  // useEffect(() => {
  //   const fetchConversations = async () => {
  //     try {
  //       const response = await axios.get('/api/conversations', {
  //         params: { conversationId: params.id }
  //       });
  //       setConversations(response.data); // Assuming response.data is an array of conversations
  //     } catch (error) {
  //       console.error("Error fetching conversations:", error);
  //     }
  //   };
  
  //   if (currentAdmin?._id) {
  //     fetchConversations();
  //   }
  // }, [currentAdmin]); // Ensure fetchConversations runs when currentAdmin changes
  
  const handleConversationSelect = async () => {
    // setSelectedConversation(conversation); // Update selectedConversation state
    try {
      const response = await axios.get(`/user/get_messages/${params.id}`);
      setMessages(response.data); // Assuming response.data is an array of messages
      setLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };
  

  useEffect(()=>{
    handleConversationSelect();
  },[])


  const sendMessage = async () => {
    // if (newMessage.trim() === "" || !selectedConversation) return;
console.log("sending message clicked")
    try {
      const response = await axios.post<Message>('/api/send_message', {
        conversationId: params.id,
        senderId: currentAdmin._id,
        senderModel: "Admin",
        text: newMessage
      });

      setMessages([...messages, response.data]);
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

  return (
    <div className="pt-16 h-screen bg-gray-50 flex flex-col">
      <div className="border-2 flex flex-col h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center px-5 py-2 border-b-2">
          <div className="flex gap-5 items-center">
            <Link to={'/chat_list'}>
              <MdArrowBackIosNew className="text-xl cursor-pointer" />
            </Link>
            <img src="/public/userIcon.webp" className="w-10 h-10 rounded-full" alt="User" />
            <span className="text-xl font-bold">Arjun Kumar VS</span>
          </div>
          <div className="flex gap-5 items-center text-2xl text-sky-500">
            <IoCall className="cursor-pointer" />
            <FaVideo className="cursor-pointer" />
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
      <div className="flex flex-col">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
          <span>{message.senderModel === "Admin" ? "You" : message.senderName}</span>
        </div>
        <div className="p-3 rounded-xl bg-sky-100 text-sm max-w-xs">
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
          <div className="p-2 rounded-full bg-sky-500 ml-3 cursor-pointer" onClick={sendMessage}>
            <BsSend className="text-white text-2xl" />
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default AdminChatSection;
