import express from 'express';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server, {
    cors:{
        origin: ['http://localhost:7000'],
        methods: ['GET', 'POST']
    }
});





export { server, app, io};