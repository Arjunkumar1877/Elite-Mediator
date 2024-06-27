import React, { createContext, useContext, useState, ReactNode, useRef } from "react";
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

  return (
    <SocketContext.Provider value={{ socket, localVideoRef, remoteVideoRef, setIsVideoCall, isVideoCall }}>
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
