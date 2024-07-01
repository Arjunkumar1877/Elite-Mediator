import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
};

const SocketContext = createContext<SocketContextType | undefined | any>(undefined);

type SocketProviderProps = {
  children: ReactNode;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket: Socket = io("http://localhost:7000");
  const localVideoRef: any = useRef<HTMLVideoElement>(null);
  const remoteVideoRef: any= useRef<HTMLVideoElement>(null);
  const [isVideoCall, setIsVideoCall] = useState<boolean>();
  const [notificationCount, setNotificationCount] = useState<number>();
  const { currentAdmin } = useSelector((state: any)=> state.admin);
  useEffect(()=>{
    socket.emit("notify", currentAdmin._id);

  },[])


  return (
    <SocketContext.Provider value={{ socket, localVideoRef, remoteVideoRef, setIsVideoCall, isVideoCall, notificationCount, setNotificationCount }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketProvider;
