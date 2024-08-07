import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
  // const socket: Socket = io("http://localhost:7000");
  const socket: Socket = io("https://elitemediator.shop");
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
    <SocketContext.Provider value={{ socket, callConnected, setCallConnected , setIsVideoCall, isVideoCall, notificationCount, setNotificationCount, token, setToken }}>
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
