// import { FaUserAlt } from "react-icons/fa";
// import { MdCall, MdCallEnd } from "react-icons/md";
// import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
// import { IoIosMicOff, IoIosMic } from "react-icons/io";
// import { useSocket } from "../../contexts/AdminContext";
// import { useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AdminCallPage: React.FC = () => {
//   const { socket, localVideoRef, remoteVideoRef, isVideoCall }: any = useSocket();
//   const navigate = useNavigate();
//   const { currentAdmin } = useSelector((state: any) => state.admin);
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const conId = query.get("conId");

//   const pc = useRef<RTCPeerConnection>(
//     new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     })
//   );

//   useEffect(() => {
//     const createOffer = async () => {
//       try {
//         const constraints = { audio: true, video: isVideoCall };
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         const offer = await pc.current.createOffer();
//         await pc.current.setLocalDescription(offer);
//         socket.emit("webrtc-offer", { name: currentAdmin.username, room: conId, isVideo: isVideoCall, offer });
//       } catch (error) {
//         console.error("Error creating offer:", error);
//       }
//     };

//     const handleOffer = async (offer: any) => {
//       if (offer.name !== currentAdmin.username) {
//         try {
//           const constraints = { audio: true, video: offer.isVideo };
//           const stream = await navigator.mediaDevices.getUserMedia(constraints);
//           stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//           if (localVideoRef.current) {
//             localVideoRef.current.srcObject = stream;
//           }

//           await pc.current.setRemoteDescription(new RTCSessionDescription(offer.offer));
//           const answer = await pc.current.createAnswer();
//           await pc.current.setLocalDescription(answer);
//           socket.emit("webrtc-answer", { room: conId, answer, name: currentAdmin.username });
//         } catch (error) {
//           console.error("Error handling offer:", error);
//         }
//       }
//     };

//     const handleAnswer = async (data: any) => {
//       const { name, answer } = data;
//       if (currentAdmin.username !== name) {
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

//     // Join the room
//     socket.emit("join room", conId);

//     // Create offer
//     createOffer();

//     // Socket event listeners
//     socket.on("webrtc-offer", handleOffer);
//     socket.on("webrtc-answer", handleAnswer);
//     socket.on("webrtc-ice-candidate", handleIceCandidate);
//     socket.on("webrtc-disconnect", handleDisconnect);

//     // ICE candidate event
//     pc.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("webrtc-ice-candidate", { room: conId, candidate: event.candidate });
//       }
//     };

//     // Track event
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
//   }, [conId, currentAdmin.username, isVideoCall, socket]);

//   return (
//     <div>
//       <div className="flex flex-col gap-y-16 p-9">
//         <div className="flex flex-col gap-5 mb-10">
//           <div className="flex flex-col justify-center items-center">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               className="w-1/4 absolute bottom-24 z-10 right-24 md:right-9 md:-bottom-4 md:w-[250px]"
//             ></video>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               className="w-1/1 relative md:w-[900px] md:h-[600px]"
//             ></video>
//           </div>
//           <div className="flex justify-center">
//             <h3>Connected</h3>
//           </div>
//           <div className="flex justify-center">
//             <div className="w-52 h-52 bg-green-300 rounded-full flex justify-center items-center">
//               <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
//                 <FaUserAlt className="text-white text-9xl p-2" />
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <div className="flex flex-col">
//               <h2 className="font-bold text-3xl text-sky-500">Arjun Kumar VS</h2>
//               <p className="text-zinc-400 text-center font-semibold">Visitor</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-3">
//           <div className="flex justify-between px-16">
//             <button className="flex justify-center items-center">
//               <HiSpeakerXMark className="text-zinc-500 text-6xl" />
//             </button>
//             <button className="flex justify-center items-center">
//               <IoIosMic className="text-zinc-500 text-6xl" />
//             </button>
//           </div>
//           <div className="flex justify-center">
//             <button
//               onClick={() => navigate(`/admin_chat/${conId}`)}
//               className="flex justify-center items-center w-20 h-20 bg-red-400 rounded-full hover:bg-red-800"
//             >
//               <MdCallEnd className="text-white text-5xl" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCallPage;

















import { FaUserAlt } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";
import { IoIosMicOff } from "react-icons/io";
import { IoIosMic } from "react-icons/io";
import { useSocket } from "../../contexts/AdminContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminCallPage = () => {
  const  {socket, localVideoRef, remoteVideoRef, isVideoCall }: any = useSocket();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state: any) => state.admin);



  return (
    <div>
      {/* <div className="flex flex-col gap-y-16 p-9">
             <div className="flex flex-col gap-5 mb-10">
             <div className="flex justify-center">
                <h3>Incomming call</h3>
              </div>

              <div className="flex justify-center">
                <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
              <FaUserAlt className="text-white text-9xl p-2" />
                </div>
              </div>

           <div className="flex justify-center">
            <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-sky-500">Arjun kumar vs</h2>
            <p className="text-zinc-400 text-center font-semibold">Visitor</p>
            </div>
           </div>
             </div>

            
             <div className="flex justify-between px-16">
              <button className="flex justify-center items-center w-24 h-24 bg-green-400 rounded-full">
              <MdCall className="text-white text-7xl" />
              </button>
              <button className=" flex justify-center items-center  w-24 h-24 bg-red-400 rounded-full">
            <MdCallEnd className="text-white text-7xl" />
</button>
             </div>
    
      </div> */}



      <div className="flex flex-col gap-y-16 p-9">
        
        <div className="flex flex-col gap-5 mb-10">

 <div className="flex flex-col justify-center items-center ">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-1/4 absolute bottom-24 z-10 right-24  md:right-9 md:-bottom-4 md:w-[250px]"
            ></video>
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-1/1 relative md:w-[900px] md:h-[600px]"
            ></video>
          </div>
          <div className="flex justify-center">
            <h3>Connected</h3>
          </div>

          <div className="flex justify-center">
            <div className="w-52 h-52 bg-green-300 rounded-full flex justify-center items-center">
              <div className="w-48 h-48 bg-sky-500 rounded-full flex justify-center items-center">
                <FaUserAlt className="text-white text-9xl p-2" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col">
              <h2 className="font-bold text-3xl text-sky-500">
                Arjun kumar vs
              </h2>
              <p className="text-zinc-400 text-center font-semibold">Visitor</p>
            </div>
          </div>


        </div>

       <div className="flex flex-col gap-3">
       <div className="flex justify-between px-16">
          <button className="flex justify-center items-center ">
            {/* <HiSpeakerWave className="text-zinc-500 text-6xl" /> */}
            <HiSpeakerXMark className="text-zinc-500 text-6xl" />
          </button>
          <button className=" flex justify-center items-center  ">
            {/* <IoIosMicOff className="text-zinc-500 text-6xl" /> */}
            <IoIosMic className="text-zinc-500 text-6xl" />
          </button>
        </div>

       <div className="flex justify-center">
       <button onClick={endCall} className=" flex justify-center items-center  w-20 h-20 bg-red-400 rounded-full hover:bg-red-800">
            <MdCallEnd className="text-white text-5xl" />
</button>
       </div>

       </div>

      </div>

    </div>
  );
};

export default AdminCallPage;
