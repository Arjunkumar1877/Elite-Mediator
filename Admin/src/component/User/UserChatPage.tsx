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

const UserChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser, messages } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conIdQ = query.get("conId");

  useEffect(() => {
    socket.on('chat message', (msg: Message, conIdQ: string) => {
      dispatch(setMessages([...messages, msg]));
    });

    return () => {
      socket.off('chat message');
    };
  }, [messages, dispatch]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/user/get_messages/${conIdQ}`);
      const data = await res.json();
      if (res.ok) {
        dispatch(setMessages(data));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate(`/chat_user?conId=${conIdQ}`);
    }
  }, [currentUser, conIdQ, navigate]);

  useEffect(() => {
    if (conIdQ) {
      fetchMessages();
    }
  }, [conIdQ]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !conIdQ) return;

    try {
      const response = await axios.post<Message>("/user/send_message", {
        conversationId: conIdQ,
        senderId: currentUser._id,
        senderModel: "User",
        text: newMessage,
      });
      socket.emit('join room', conIdQ);

      socket.emit('chat message', response.data, conIdQ);
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
            {currentUser && <span className="text-xl font-bold">{currentUser.username}</span>}
          </div>
          <div className="flex gap-5 items-center text-2xl text-sky-500">
            <IoCall className="cursor-pointer" />
            <FaVideo className="cursor-pointer" />
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
                  className={`flex ${message.senderModel === "User" ? "justify-end" : "justify-start"} gap-3`}
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
                      <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                      <span>{message.senderModel === "User" ? "You" : message.senderName || "Admin"}</span>
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
      </div>
    </div>
  );
};

export default UserChatPage;
