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
  // const socket: Socket = io("http://13.60.104.214");
  const socket: Socket = io("https://elitemediator.shop");
  const localVideoRef: any = useRef<HTMLVideoElement>(null);
  const remoteVideoRef: any= useRef<HTMLVideoElement>(null);
  const [isVideoCall, setIsVideoCall] = useState<boolean>();
  const [notificationCount, setNotificationCount] = useState<number>();
  const [callConnected, setCallConnected] = useState<boolean>(false);
  const [token, setToken] = useState<any>('');

  const { currentAdmin } = useSelector((state: any)=> state.admin);
  useEffect(()=>{
    if(currentAdmin){
      socket.emit("notify", currentAdmin._id);

    }
  },[])


  return (
    <SocketContext.Provider value={{ socket, localVideoRef, remoteVideoRef, callConnected, setCallConnected , setIsVideoCall, isVideoCall, notificationCount, setNotificationCount, token, setToken }}>
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
