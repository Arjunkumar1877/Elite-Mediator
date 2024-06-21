import { Server as HTTPServer } from 'http';
import { Socket, Server as SocketIoServer } from 'socket.io';
import { ConversationModel } from '../../database/models/admin/ConversationModel';

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
            console.log(`Socket ${socket.id} joining room ${convId}`);
            socket.join(convId);
        });

        socket.on('join room', (adminId) => {
            console.log(`Socket ${socket.id} joining room ${adminId}`);
            socket.join(adminId);
        });

        // Handle chat messages
        socket.on('chat message', async (msg: any, convId, adminId) => {
            console.log(`Message received in room ${convId}:`, msg);

            // Fetch the current conversation to get the latest unread count
            const conversation = await ConversationModel.findById(msg.conversationId);

            // Check if the conversation exists
            if (!conversation) {
                console.error(`Conversation with ID ${msg.conversationId} not found`);
                return;
            }

            // Reset unread count to 0 when admin sends a message
            if (msg.senderModel === 'Admin') {
                console.log(`Admin message. Resetting unread count to 0 for conversation ${msg.conversationId}`);

                // Update last message in conversation
                await ConversationModel.findByIdAndUpdate(msg.conversationId, {
                    lastMessage: {
                        text: msg.text,
                        time: msg.createdAt,
                        unread: 0 // Reset unread count
                    },
                });
            }

            // Increment unread count for user messages
            if (msg.senderModel === 'User') {
                const newUnreadCount = conversation?.lastMessage?.unread;
                console.log(`User message. Incrementing unread count to ${newUnreadCount} for conversation ${msg.conversationId}`);

                // Update last message in conversation with incremented unread count
                await ConversationModel.findByIdAndUpdate(msg.conversationId, {
                    lastMessage: {
                        text: msg.text,
                        time: msg.createdAt,
                        unread: newUnreadCount ?  newUnreadCount+1 : 1
                    },
                });
            }

            io.to(convId).emit('chat message', msg);
            io.emit('update conversation', adminId);
        });

    });

    return io;
}

export { initializeSocket };
