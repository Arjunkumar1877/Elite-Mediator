import { Server as HTTPServer } from 'http';
import { Socket, Server as SocketIoServer } from 'socket.io';
import { ConversationModel } from '../../database/models/admin/ConversationModel';
import { UnreadMessageModel } from '../../database/models/admin/UnreadMessageCountModel';

function initializeSocket(server: HTTPServer): SocketIoServer {

  console.log("Initializing socket");

  const io = new SocketIoServer(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  });

  // Handle socket connection
  io.on('connection', (socket) => {

    console.log('A user connected: ' + socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected: ' + socket.id);
    });

    // Handle joining a specific conversation room
    socket.on('join room', (convId) => {
      console.log(`Socket ${socket.id} joining room ${convId} 😣😣😣😣`);
      socket.join(convId);
    });

    socket.on('join room', (adminId) => {
      console.log(`Socket ${socket.id} joining room ${adminId} 🔥🤷‍♂️😥📀`);
      socket.join(adminId);
    });

    socket.on('chat message', async (msg: any, convId, adminId) => {
      console.log(`Message received in room ${convId}:`, msg);

      // Fetch the current conversation to get the latest unread count
      const conversation = await ConversationModel.findById(msg.conversationId);

      if (!conversation) {
        console.error(`Conversation with ID ${msg.conversationId} not found`);
        return;
      }

      let newUnreadCount = 0;

      if (msg.senderModel === 'Admin') {
        console.log(`Admin message. Resetting unread count to 0 for conversation ${msg.conversationId}`);
        newUnreadCount = 0;
      } else if (msg.senderModel === 'User') {
        newUnreadCount = (conversation?.lastMessage?.unread || 0) + 1;
        console.log(`User message. Incrementing unread count to ${newUnreadCount} for conversation ${msg.conversationId}`);
      }

      // Update last message in conversation
      await ConversationModel.findByIdAndUpdate(msg.conversationId, {
        lastMessage: {
          text: msg.text,
          time: msg.createdAt,
          unread: newUnreadCount
        },
      });

      io.to(convId).emit('recieve_message', msg);
      const totalUnreadCount = await calculateTotalUnreadMessages(adminId);
      io.emit('update conversation', adminId);
      io.to(adminId).emit('notify', totalUnreadCount);
    });

    socket.on('notify', async (adminId: string) => {
      const totalUnreadCount = await calculateTotalUnreadMessages(adminId);
      
      console.log(`${totalUnreadCount} 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥`);
      io.to(adminId).emit('notify', totalUnreadCount);
    });
  });

  return io;
}
async function calculateTotalUnreadMessages(adminId: string): Promise<number> {
    const conversations = await ConversationModel.find({ adminId });
    return conversations.map(conversation => conversation?.lastMessage?.unread || 0)
      .reduce((total, unreadCount) => total + unreadCount, 0);
    }
  

export { initializeSocket };


