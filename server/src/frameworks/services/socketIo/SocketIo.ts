import { Server as HTTPServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { ConversationModel } from "../../database/models/admin/ConversationModel";
import { UnreadMessageModel } from "../../database/models/admin/UnreadMessageCountModel";

function initializeSocket(server: HTTPServer): SocketIoServer {
  console.log("Initializing socket");

  const io = new SocketIoServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });

    socket.on("join room", (roomId) => {
      console.log(`Socket ${socket.id} joining room ${roomId}`);
      socket.join(roomId);
    });

    socket.on("chat message", async (msg, convId, adminId) => {
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
      const totalUnreadCount = await calculateTotalUnreadMessages(adminId);
      io.emit("update conversation", adminId);
      io.to(adminId).emit("notify", totalUnreadCount);
    });

    socket.on("notify", async (adminId) => {
      const totalUnreadCount = await calculateTotalUnreadMessages(adminId);
      console.log(`${totalUnreadCount} 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥`);
      io.to(adminId).emit("notify", totalUnreadCount);
      // io.to(adminId).emit("webrtc-offer", adminId);


    });


    // socket.on("incoming-call", (data)=>{
    //   console.log("icomming call " + data)
    //   io.to(data).emit("incoming-call", data);
    // })


    socket.on("webrtc-offer", (data) => {
      console.log("Received WebRTC offer:", data);
      io.to(data.adminId).emit('webrtc-offer', data);
      io.to(data.room).emit("webrtc-offer", data);
    });

    socket.on("webrtc-answer", (data) => {
      console.log("Received WebRTC answer:", data);
      io.to(data.room).emit("webrtc-answer", data);
    });

    socket.on("webrtc-ice-candidate", (data) => {
      // console.log("Received WebRTC ICE candidate:", data);
      io.to(data.room).emit("webrtc-ice-candidate", data.candidate);
    });
  });

  return io;
}

async function calculateTotalUnreadMessages(adminId: any) {
  const conversations = await ConversationModel.find({ adminId });
  return conversations.reduce((total, conversation) => total + (conversation?.lastMessage?.unread || 0), 0);
}

export { initializeSocket };
