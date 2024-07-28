
import { Server as HTTPServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { ConversationModel } from "../../database/models/admin/ConversationModel";

function initializeSocket(server: HTTPServer): SocketIoServer {
  console.log("Initializing socket");

  const io = new SocketIoServer(server, {
    cors: {
      origin: "https://elitemediator.shop", // Replace with your domain
      // origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
    },
  });
  

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
      // Handle any cleanup if necessary
    });

    socket.on("join room", (roomId) => {
      console.log(`Socket ${socket.id} joining room ${roomId}`);
      socket.join(roomId);
    });

    socket.on("chat message", async (msg, convId, adminId) => {
      try {
        console.log(`Message received in room ${convId}:`, msg);
        const conversation = await ConversationModel.findById(msg.conversationId);
        if (!conversation) {
          console.error(`Conversation with ID ${msg.conversationId} not found`);
          return;
        }

        let newUnreadCount = 0;
        if (msg.senderModel === "Admin") {
          console.log(`Admin message. Resetting unread count to 0 for conversation ${msg.conversationId}`);
          newUnreadCount = 0;
        } else if (msg.senderModel === "User") {
          newUnreadCount = (conversation?.lastMessage?.unread || 0) + 1;
          console.log(`User message. Incrementing unread count to ${newUnreadCount} for conversation ${msg.conversationId}`);
        }

        await ConversationModel.findByIdAndUpdate(msg.conversationId, {
          lastMessage: {
            text: msg.text,
            time: msg.createdAt,
            unread: newUnreadCount,
          },
        });

        io.to(convId).emit("recieve_message", msg);
        const totalUnread = await calculateTotalUnreadMessages(adminId);
        io.emit("update conversation", adminId);
        // io.to(adminId).emit("notify", totalUnread);
      } catch (error) {
        console.error('Error processing chat message:', error);
      }
    });

    socket.on("notify", async(adminId) => {
      try {
        const totalUnreadCount = await calculateTotalUnreadMessages(adminId);
        console.log(`Notify: ${totalUnreadCount}`);
        console.log(adminId)
        io.to(adminId._id).emit("notify", totalUnreadCount);
        io.to(adminId).emit("notify", totalUnreadCount);
      } catch (error) {
        console.error('Error in notify:', error);
      }
    });

    socket.on("incoming-call", (data) => {
      console.log("💕💕💕💕💕Incoming call", data);
      io.to(data.conId).emit("incoming-call", data);
      io.to(data.adminId).emit("incoming-call", data);
      io.to(data.adminId._id).emit("incoming-call", data);
    });

    socket.on("webrtc-offer", (data) => {
      console.log("Received WebRTC offer:", data);
      io.to(data.adminId).emit('webrtc-offer', data);
      io.to(data.room).emit("webrtc-offer", data);
    });

    socket.on("webrtc-answer", async(data) => {
      // console.log("Received WebRTC answer:", data);
      io.to(data.room).emit("webrtc-answer", data);
    });

    socket.on("webrtc-ice-candidate", (data) => {
      // console.log("Received WebRTC ICE candidate:", data);
      io.to(data.room).emit("webrtc-ice-candidate", data.candidate);
    });

    socket.on("webrtc-disconnect", (conId, callerId) => {
      console.log(conId, callerId + "💕💕💕💕💕💕")
      io.to(conId).emit('webrtc-disconnect', conId, callerId);
    });

    socket.on("end-call", (data)=>{

    })
  });

  return io;
}


process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function calculateTotalUnreadMessages(adminId: any) {
  try {
    const conversations = await ConversationModel.find({ adminId });
    return conversations.reduce((total, conversation) => total + (conversation?.lastMessage?.unread || 0), 1);
  } catch (error) {
    console.error('Error calculating total unread messages:', error);
    return 0;
  }
}

export { initializeSocket };
