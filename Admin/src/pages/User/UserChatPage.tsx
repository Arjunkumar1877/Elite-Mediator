import { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import { FaTrashAlt, FaVideo } from "react-icons/fa";
import { HiDotsVertical, HiOutlinePaperClip } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess, setMessages, signInSuccess } from "../../redux/user/UserSlice";
import io from "socket.io-client";
import { useSocket } from "../../contexts/AdminContext";
import { MdCleaningServices, MdOutlineZoomOutMap } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app, { requestPermission } from "../../firebase/firebase";
import ReactLoading from "react-loading";
import { confirmAlert } from "react-confirm-alert";
import AudioRecorder from "../../component/Admin/AudioRecorder";

const socket = io("http://localhost:7000");

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



const UserChatPage: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser, messages } = useSelector((state: any) => state.user);
  const { setIsVideoCall }: any = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [fileType, setFileType] = useState<any>("text");
  const [audioUploadingProgress, setAudioUploadingProgress] = useState<boolean>(false)
  const [messageData, setMessageData] = useState<Message>({
    conversationId: conId,
    senderId: currentUser._id,
    senderModel: "User",
    type: "text",
    text: "",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  // console.log(currentUser);

  const fetchOrSaveFcmToken = async()=>{
    const token:any = await requestPermission();
    const res = await fetch('/user/user_add_or_get_fcmtoken', {
     method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: token, userId: currentUser._id})
    })
 
    
 
    const data: any = await res.json();
    console.log(data);
 console.log("fcm updated succesfully ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️")
    if(data){
     dispatch(signInSuccess(data))
    }
 
    
   }


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
        (error: any) => {
          console.log(error)
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
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
      setImageUploadProgress(null);
    }
  };

  useEffect(() => {
    fetchOrSaveFcmToken();
    socket.emit("join room", conId);
    socket.on("incoming-call", (data: any) => {
      console.log(data);
      if (data.callerId) {
        navigate(
          `/call_page_user?conId=${data.conId}&incommingId=${data.incommingId}&callerId=${data.callerId}`
        );
      }
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
          callType: isVideo ? "video" : "audio",
          receiver: "Admin",
        }),
      });

      const data: any = await res.json();
      console.log(data);

      if (data) {
        socket.emit("incoming-call", {
          conId,
          incommingId: currentUser._id,
          adminId: currentUser.adminId,
          callerId: data._id,
        });
      }
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
    console.log("sending message");

    try {
      const response = await axios.post<Message>("/user/user_send_message", {
        messageData: messageData,
        token: currentUser?.adminId?.fcmToken,
        username: currentUser.username
      });

      socket.emit("chat message", response.data, conId, currentUser.adminId);
      socket.emit("update conversation", currentUser.adminId);
      socket.emit("notify", currentUser.adminId);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    navigate("/");
  };

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  const handleClearChat = async () => {
    confirmAlert({
      title: "Clear Chat",
      message: `Do you want to delete all this conversations ?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            console.log("clearing chat clicked");
            const res = await fetch(`/user/clear_user_chat/${conId}`);
            const data = await res.json();

            if (data.success) {
              fetchMessages();
              setShowOptions(false);
              toast("All messages deleted sucessfully...", {
                duration: 1000,
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            setShowOptions(false);
            return;
          },
        },
      ],
    });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageData({ ...messageData, text: e.target.value });
  };


  
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
      setFile(audioUrl);
      setAudioUploadingProgress(false)
      // Optionally, you can perform additional actions after successfully saving the audio
    }
  } catch (error) {
    console.error('Error handling recording:', error);
    // Handle error (e.g., display error message to user)
  }
};

const handleCancelRecordedAudio = async()=>{
  setFile('');
  setFileType('text');
  setMessageData({...messageData, text: '', type: 'text'});
  setFileUploading(false);
}



const downloadImage = (img: string) => {
  const link = document.createElement('a');
  link.href = img || '';
  link.download = 'image.jpg';
  link.target = '_blank'
  link.click();
};


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
            {currentUser.propId.allowVideoCalls && (
              <FaVideo
                className="cursor-pointer hover:text-sky-800"
                onClick={() => startCall(true)}
              />
            )}
            <HiDotsVertical
              className="cursor-pointer hover:text-sky-800 hover:bg-slate-200 rounded-full hover:text-2xl hover:p-1 md:hover:text-3xl"
              onClick={() => setShowOptions(!showOptions)}
            />

            <FiLogOut className="cursor-pointer " onClick={handleSignOut} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-5">
            {messages?.length > 0 &&
              messages.map((message: any) => (
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
                      <span>{formatTime(message.createdAt)}</span>
                      <span>
                        {message.senderModel === "User"
                          ? <span className="text-sky-500 font-bold">You</span>
                          : <span className="text-sky-500 font-bold">{currentUser.adminId.username}</span>  || "Admin"}
                      </span>
                    </div>
                    {message.type === "text" ? (
                      <div className="p-3 rounded-xl bg-sky-100 text-sm break-words">
                        {message.text}
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-sky-100 text-sm break-words">
                      {message?.type &&  message?.type?.startsWith("image/") ? (
                      <div className="relative">
                      <MdOutlineZoomOutMap
                        onClick={() => downloadImage(message.text)}
                        className="text-sky-500 hover:text-sky-800 absolute top-0 left-0 text-3xl  md:text-5xl cursor-pointer"
                      />
                      <img
                        src={message.text}
                        alt="Shared file"
                        className="w-[200px] md:w-[500px]"
                      />
                    </div>
                    
                      ) : message?.type?.startsWith("video/") ? (
                        <video className="w-[200px] md:w-[500px]" controls >
                          <source src={message.text} type={message.type} />
                        </video>
                      ) : (
                        <audio className="w-[200px] h-[60px] md:w-[500px] " controls>
                        <source src={message.text}
                       type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      )}
                    </div>
                    )}
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
          <div className="w-34 h-39 absolute bg-slate-700 opacity-70 right-24 rounded top-16 flex flex-col p-3 gap-4 md:w-40">
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

export default UserChatPage;
