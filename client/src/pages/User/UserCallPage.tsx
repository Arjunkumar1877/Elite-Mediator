import { FaUserAlt } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { IoIosMicOff, IoIosMic } from "react-icons/io";
import { useSocket } from "../../contexts/AdminContext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



const UserCallPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conId = query.get("conId");
  const incommingId = query.get("incommingId");
  const callerId: string | null = query.get("callerId");
  const IsvideoCall: string  | null = query.get('videoCall');
  const videoCall: boolean = IsvideoCall === 'true' ? true : false; 

  const {
    socket
  }: any = useSocket();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [callConnected, setCallConnected] = useState<boolean>(false);
  const [callConnecting, setCallConnecting] = useState<boolean>(true);
  const localVideoRef: any = useRef<HTMLVideoElement>(null);
  const remoteVideoRef: any= useRef<HTMLVideoElement>(null);
  let pc = useRef<RTCPeerConnection | null>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(timer); 
  }, []);
  
  const formatTime = (seconds: number): string => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes: any = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };



  const toggleMute = () => {
    console.log("localVideoRef.current:", localVideoRef.current);
    
    if (localVideoRef.current) {
      const localStream = localVideoRef.current.srcObject as MediaStream;

      if (localStream) {
        const audioTracks = localStream.getAudioTracks();

        if (audioTracks.length > 0) {
          audioTracks.forEach(track => {
            track.enabled = !track.enabled;
          });
          setIsMuted(prevState => !prevState);
          console.log('Mute toggled:', !isMuted);
        } else {
          console.log('No audio tracks found in local stream');
        }
      } else {
        console.log('localStream is null or undefined');
      }
    } else {
      console.log('localVideoRef is null or undefined');
    }
  };

  

  useEffect(() => {

    if (!pc.current) {
      pc.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
    } 
    socket.emit("join room", conId);

    const createOffer = async () => {
      try {
        const constraints = { audio: true, video: videoCall  };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach((track) => pc?.current?.addTrack(track, stream));

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          console.log('Stream assigned to localVideoRef');
        }

        const offer = await pc?.current?.createOffer();
        await pc?.current?.setLocalDescription(offer);
        socket.emit("webrtc-offer", { incommingId: currentUser.username, room: conId, isVideo: videoCall, offer, callerId: callerId });
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    };

    if(incommingId === currentUser._id){
      createOffer();
    }
    
    const handleOffer = async (offer: any) => {
      console.log(offer)
      if (offer.incommingId !== currentUser.username) {
        confirmAlert({
          title: 'Incoming Call',
          message: `You have a call from ${offer.incommingId}. Do you want to accept the call?`,
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                try {
                  // setIsVideoCall(offer.isVideo);
                  updateCallAnswering(offer.callerId);
                  const constraints = { audio: true, video: offer.isVideo };
                  const stream = await navigator.mediaDevices.getUserMedia(constraints);
                  stream.getTracks().forEach((track) => pc?.current?.addTrack(track, stream));
    
                   if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                    console.log('Stream assigned to localVideoRef on offer acceptance');
                  }

                  console.log(localVideoRef)
    
                  await pc?.current?.setRemoteDescription(new RTCSessionDescription(offer.offer));
                  const answer = await pc?.current?.createAnswer();
                  await pc?.current?.setLocalDescription(answer);
                  socket.emit("webrtc-answer", { room: conId, answer, incommingId: currentUser.username, callerId: offer.callerId });
                } catch (error) {
                  console.error('Error handling offer acceptance:', error);
                }
              }
            },
            {
              label: 'No',
              onClick: () => {
                try {
                  navigate(`/chat_user?conId=${conId}`);
                  updateCallCancelling(offer.callerId);
                  socket.emit("webrtc-disconnect", conId, offer.callerId);
                } catch (error) {
                  console.error('Error handling offer rejection:', error);
                }
              }
            }
          ]
        });
      }
    };
    

    const handleAnswer = async (data: any) => {
      const { incommingId, answer } = data;
      if (currentUser.username !== incommingId) {
        if (pc?.current?.signalingState === "have-local-offer") {
          try {
            await pc?.current?.setRemoteDescription(new RTCSessionDescription(answer));
          } catch (error) {
            console.error("Error setting remote description:", error);
          }
        } else {
          console.warn("Signaling state is not 'have-local-offer'. Current state: ", pc?.current?.signalingState);
        }
      }
    };

    const handleIceCandidate = async (candidate: any) => {
      try {
        await pc?.current?.addIceCandidate(new RTCIceCandidate(candidate));
        console.log(localVideoRef);
console.log(remoteVideoRef);
      } catch (error) {
        console.error("Error adding received ice candidate", error);
      }
    };

    const handleDisconnect = (conId: any) => {
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
      navigate(`/chat_user?conId=${conId}`);
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
        setCallConnecting(false);
        setCallConnected(true)
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      socket.off("webrtc-offer", handleOffer);
      socket.off("webrtc-answer", handleAnswer);
      socket.off("webrtc-ice-candidate", handleIceCandidate);
      socket.off("webrtc-disconnect", handleDisconnect);
    };
  }, [conId, currentUser.username, videoCall]);

  const updateCallCancelling = async (callerId: any) => {
    try {
      const res = await fetch(`/api/decline_call/${callerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating call status:', error);
    }
  };
  
  const updateCallAnswering= async (callerId: any) => {
    try {
      const res = await fetch(`/api/accept_call/${callerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating call status:', error);
    }
  };

  const updateCallDisconnecting = async (callerId: any) => {
    try {
      const res = await fetch(`/api/disconnect_call/${callerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating call status:', error);
    }
  };


  const handleCutTheCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const localStream = localVideoRef.current.srcObject as MediaStream;
      localStream.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (pc.current) {
      pc.current.getSenders().forEach((sender) => sender.track && sender.track.stop());
      pc.current.close();
    }
    socket.emit("webrtc-disconnect", conId, callerId);

    socket.off("webrtc-offer");
    socket.off("webrtc-answer");
    socket.off("webrtc-ice-candidate");

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    navigate(`/chat_user?conId=${conId}`);
    updateCallDisconnecting(callerId)
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col gap-y-2 p-9">
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex justify-center">
            {
                callConnecting && callConnecting ?   <h3 className="text-2xl font-bold">Calling....</h3> :  <h3 className="text-2xl font-bold">Connected</h3>



            }
          </div>
          <div className="flex justify-center">
            {videoCall ? (
              <div className="flex flex-col justify-center items-center relative">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-1/4 absolute bottom-4 z-10 right-4 md:right-16 md:bottom-4 md:w-[250px] border-2 border-white"
                ></video>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-full h-full md:w-[900px] md:h-[700px] border-2 border-white"
                ></video>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
              <div className={`w-52 h-52 rounded-full flex justify-center items-center ${callConnected && ' bg-green-300'}`}>
              <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
                <FaUserAlt className="text-white text-9xl p-2" />
              </div>
           
            </div>
            <div className="w-[50px] h-[50px]" >
            <video
             ref={localVideoRef}
             autoPlay
             muted
           ></video>
             <video
             ref={remoteVideoRef}
             autoPlay
           ></video>
            </div>
           </div>
            )}
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-3xl text-sky-500">Arjun Kumar VS</h2>
              {
                callConnecting && callConnecting ? (
              <p>Calling....</p>
                ) : (
                 <>
                  <p className="text-green-600">Connected</p>
                  <p>Call Duration: { callConnected ? formatTime(seconds) : '00:00:00'}</p>

                 </>
                )
              }

            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center px-16">
            <button className="flex justify-center p-2 items-center hover:rounded-full hover:bg-slate-100" onClick={toggleMute}>
              { isMuted ? <IoIosMicOff className="text-zinc-500 text-6xl" /> : <IoIosMic className="text-zinc-500 text-6xl" /> }
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCutTheCall}
              className="flex justify-center items-center w-20 h-20 bg-red-400 rounded-full hover:bg-red-800"
            >
              <MdCallEnd className="text-white text-5xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCallPage;


