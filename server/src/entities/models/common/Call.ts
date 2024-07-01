export interface Call {
    conversationId: string; 
    adminId: string; 
    userId: string;
    caller: "User" | "Admin";
    receiver: "User" | "Admin";
    callStatus?: "declined" | "answered" | "missed";
    callType: "audio" | "video";
    callStarted?: Date;
    callEnded?: Date;
    callDuration?: Date;
  }