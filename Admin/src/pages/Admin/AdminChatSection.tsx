import React, { useEffect, useState, useRef } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaVideo, FaRegEdit } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { BsSend } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSocket } from "../../contexts/AdminContext";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { storage } from "./firebaseConfig";
import { MdCleaningServices } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app, { storage } from "../../firebase/firebase";
import ReactLoading from "react-loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AudioRecorder from "./AudioRecorder";

interface Message {
  _id?: string;
  conversationId: string | number | null;
  senderId: string;
  senderModel: "User" | "Admin";
  type: "text" | string;
  text: string;
  createdAt?: string;
  senderName?: string;
}

interface Conversation {
  _id: string;
  userId: { _id: string; username: string; phone?: number };
  adminId: string;
  propId: string;
  propertyId: { userType: string; allowVedioCalls: boolean };
}

const AdminChatSection: React.FC = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentAdmin } = useSelector((state: any) => state?.admin);
  const navigate = useNavigate();
  const { socket, setIsVideoCall }: any = useSocket();
  const [editingName, setEditingName] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");
  const [file, setFile] = useState<any>();
  const [fileType, setFileType] = useState<any>("text");
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [audio, setAudio] = useState<any>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState<boolean>(false)
  const [messageData, setMessageData] = useState<Message>({
    conversationId: conId,
    senderId: currentAdmin._id,
    senderModel: "Admin",
    type: "text",
    text: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageData({ ...messageData, text: e.target.value });
  };

  useEffect(() => {
    socket.emit("join room", conId);

    const handleIncomingCall = (data: any) => {
      console.log(data);
      if (data) {
        navigate(
          `/call_admin_page?conId=${data.conId}&incommingId=${data.incommingId}&callerId=${data.callerId}`
        );
      }
    };

    socket.on("incoming-call", handleIncomingCall);

    return () => {
      socket.off("incoming-call", handleIncomingCall);
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
          callType: isVideo ? "video" : "audio",
          receiver: "User",
        }),
      });

      const data = await res.json();
      if (data._id) {
        console.log(
          "emitted for calling 💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕"
        );
        socket.emit("incoming-call", {
          conId,
          incommingId: currentAdmin._id,
          adminId: currentAdmin._id,
          callerId: data._id,
        });
      }
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>(
        `/api/get_admin_messages/${conId}`
      );
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
    // if (newMessage.trim() === "" || !conId) return;
    console.log(messageData);

    try {
      const response = await axios.post<Message>("/api/send_message", {
        messageData,
      });

      socket.emit("chat message", response.data, conId, currentAdmin._id);
      setNewMessage("");
      setFileType("text");
      setFile(null);
      setMessageData({ ...messageData, type: "text", text: "" });
      scrollToBottom();
      setFileUploading(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(e.target.files);

      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        console.log(file.type);
        setFileType(file.type);
        setFile(file);
        handleFileUpload(file);
        return;
      }
      return toast("Please select an Image or a Video..");
    }
  };

  const handleFileUpload = async (file: File) => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (!file) {
      toast("Please select a file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast("Maximum limit of the file size you can share is 20MB");
      toast("file size is too large select another file..");
      setFileType("text");
      setFile(null);
      return;
    }

    try {
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setFileUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress);
        },
        (error) => {
          setImageUploadError("File upload failed: " + error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            console.log(downloadURL);
            setFile(downloadURL);
            setMessageData((prev) => ({
              ...prev,
              type: file.type,
              text: downloadURL,
            }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("File upload failed");
      setImageUploadProgress(null);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChangeName = async (
    userId: string | undefined,
    newName: string
  ) => {
    try {
      const res = await fetch("/api/edit_unknown_username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, username: newName }),
      });

      const data = await res.json();
      if (data) {
        setEditingName(false);
        fetchSelectedConversation();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  const handleClearChat = async () => {
    confirmAlert({
      title: "Clear chat",
      message: "Do you want to delete all these conversations?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            console.log("Clearing chat clicked");
            const res = await fetch(`/api/clear_admin_chat/${conId}`);
            const data = await res.json();

            if (data.success) {
              fetchMessages();
              setShowOptions(false);
              toast("All messages deleted successfully...", {
                autoClose: 1000,
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            setShowOptions(false);
          },
        },
      ],
    });
  };

  console.log(selectedConversation);



const MAX_AUDIO_SIZE = 20 * 1024 * 1024; 

const handleAudioUpload = async (audioFile: File | Blob): Promise<string | null> => {
  if (!audioFile || audioFile.size === 0) {
    toast.error("Please select an audio file");
    return null;
  }

  if (audioFile instanceof File && audioFile.size > MAX_AUDIO_SIZE) {
    toast.error("Maximum audio file size limit is 20MB");
    return null;
  }

  try {
    setAudioUploadingProgress(true)
    const storage = getStorage();
    const fileName = new Date().getTime() + "_" + (audioFile instanceof File ? audioFile.name : 'audio.webm');
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, audioFile);
    setFileUploading(true)

    return new Promise<string | null>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading audio:", error);
          toast.error("Failed to upload audio");
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            toast.error("Failed to get audio download URL");
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error uploading audio:", error);
    toast.error("Failed to upload audio");
    return null;
  }
};




const handleRecordingComplete = async (blob: Blob) => {
  try {
    const audioUrl = await handleAudioUpload(blob);
    if (audioUrl) {
      setMessageData({ ...messageData, text: audioUrl, type: blob.type });

      console.log('Audio URL:', audioUrl);
      setFileType(blob)
      console.log(blob.type)
      setAudio(audioUrl);
      setFile(audioUrl);
      setAudioUploadingProgress(false)
    }
  } catch (error) {
    console.error('Error handling recording:', error);
  }
};

const handleCancelRecordedAudio = async()=>{
  setFile('');
  setFileType('text');
  setMessageData({...messageData, text: '', type: 'text'});
  setFileUploading(false);
}




if (loading) {
  return (
    <div className="flex justify-center items-center h-full">
      <ReactLoading type={"spin"} color={"#000"} />
    </div>
  );
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
                    onClick={() =>
                      handleChangeName(
                        selectedConversation?.userId?._id,
                        newName
                      )
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-center gap-2 items-center text-lg md:text-2xl">
                  {selectedConversation?.userId?.username}
                  {selectedConversation?.propertyId?.userType === "Unknown" && (
                    <FaRegEdit
                      className="cursor-pointer text-sky-500 hover:text-sky-800"
                      onClick={() => setEditingName(true)}
                    />
                  )}
                </div>
              )}
            </span>
          </div>
          <div className="flex gap-5 items-center text-lg md:text-2xl text-sky-500">
            <IoCall
              className="cursor-pointer hover:text-sky-800"
              onClick={() => startCall(false)}
            />

            {selectedConversation &&
              selectedConversation.propertyId.allowVedioCalls && (
                <FaVideo
                  className="cursor-pointer hover:text-sky-800"
                  onClick={() => startCall(true)}
                />
              )}
            <HiDotsVertical
              className="cursor-pointer hover:text-sky-800 hover:bg-slate-200 rounded-full hover:text-2xl hover:p-1 md:hover:text-3xl"
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            {messages.map((message: Message) => (
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
                    <span>{formatTime(message?.createdAt)}</span>
                    <span>
                      {message.senderModel === "Admin"
                        ? "You"
                        : message.senderName}
                    </span>
                  </div>
                  {message.type === "text" ? (
                    <div className="p-3 rounded-xl bg-sky-100 text-sm break-words">
                      {message.text}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-sky-100 text-sm break-words">
                      {message.type.startsWith("image/") ? (
                        <img
                          src={message.text}
                          alt="Shared file"
                          className="w-[200px] md:w-[500px]"
                        />
                      ) : message.type.startsWith("video/") ? (
                        <video className="w-[200px] md:w-[500px]" controls >
                          <source src={message.text} type={message.type} />
                        </video>
                      ) : (
                        <audio className="w-[200px] h-[40px] md:w-[300px]" controls>
                        <source src={message.text}
                       type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      )}
                    </div>
                  )}
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
  {!fileUploading && (
    <AudioRecorder onRecordingComplete={handleRecordingComplete} />
  )}

  {audioUploadingProgress && (
    <ReactLoading
      type="bubbles"
      className="text-sky-500"
      color={"skyBlue"}
      width={100}
    />
  )}

  {fileType === "text" && (
    <input
      type="text"
      placeholder="Write something..."
      className="flex-1 mx-3 p-2 rounded-lg border bg-sky-100 border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      value={messageData.text}
      onChange={handleMessageChange}
      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
    />
  )}

  <div className="flex">
    {imageUploadProgress && imageUploadProgress < 100 ? (
      <ReactLoading
        type="bubbles"
        className="text-sky-500"
        color={"skyBlue"}
        width={100}
      />
    ) : (
      file && (
        <>
          {typeof fileType === "string" && fileType.startsWith("image/") ? (
            <img src={file} alt="Selected file" width={250} />
          ) : typeof fileType === "string" && fileType.startsWith("video/") ? (
            <video src={file} width={250} height={400} controls />
          ) : (
            <div className="flex gap-1 justify-center items-center">
              <audio className="rounded" src={file} controls />
              <div
                className="hover:bg-sky-100 p-3 rounded-full"
                onClick={handleCancelRecordedAudio}
              >
                <FaTrashAlt className="text-sky-500 cursor-pointer" />
              </div>
            </div>
          )}
        </>
      )
    )}

    <input
      type="file"
      ref={fileRef}
      name=""
      id=""
      onChange={handleFileChange}
      hidden
    />

    {!fileUploading && (
      <HiOutlinePaperClip
        onClick={() => fileRef.current?.click()}
        className="text-sky-500 text-2xl cursor-pointer"
      />
    )}
  </div>
  
  {messageData && messageData.text !== "" && (
    <div
      className="p-2 rounded-full bg-sky-500 ml-3 cursor-pointer"
      onClick={sendMessage}
    >
      <BsSend className="text-white text-2xl" />
    </div>
  )}
</div>



        {showOptions && (
          <div className="w-34 h-39 absolute bg-slate-700 opacity-70 right-14 rounded top-12 flex flex-col p-3 gap-4 md:w-40">
            {selectedConversation?.propertyId.userType !== "Unknown" && (
              <>
                <a
                  href={`https://wa.me/${selectedConversation?.userId?.phone}`}
                >
                  <div className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg">
                    <FaWhatsapp className="text-green-600" />{" "}
                    <span className="text-sm"> Whats app</span>
                  </div>
                </a>
                <a href={`tel:${selectedConversation?.userId?.phone}`}>
                  <div className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg">
                    <IoCall className="text-green-600" />{" "}
                    <span className="text-sm">
                      {selectedConversation?.userId.phone}
                    </span>
                  </div>
                </a>
              </>
            )}
            <div
              className="flex justify-start gap-2  rounded items-center hover:p-1 hover:bg-slate-900 cursor-pointer text-white text-sm md:text-lg"
              onClick={handleClearChat}
            >
              <MdCleaningServices className="text-red-600" />{" "}
              <span className="text-sm">Clear chat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatSection;
