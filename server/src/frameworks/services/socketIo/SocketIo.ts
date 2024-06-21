

import { Server as HTTPServer } from 'http';
import { Socket, Server as SocketIoServer } from 'socket.io';

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

        // Handle chat messages
        socket.on('chat message', (msg, convId) => {
            console.log(`Message received in room ${convId}: ${msg}`);
            io.to(convId).emit('chat message', msg); 
        });
    });

    return io;
}

export { initializeSocket };
