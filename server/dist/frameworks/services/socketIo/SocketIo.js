"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const ConversationModel_1 = require("../../database/models/admin/ConversationModel");
function initializeSocket(server) {
    console.log("Initializing socket");
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
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
        socket.on("chat message", (msg, convId, adminId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log(`Message received in room ${convId}:`, msg);
                const conversation = yield ConversationModel_1.ConversationModel.findById(msg.conversationId);
                if (!conversation) {
                    console.error(`Conversation with ID ${msg.conversationId} not found`);
                    return;
                }
                let newUnreadCount = 0;
                if (msg.senderModel === "Admin") {
                    console.log(`Admin message. Resetting unread count to 0 for conversation ${msg.conversationId}`);
                    newUnreadCount = 0;
                }
                else if (msg.senderModel === "User") {
                    newUnreadCount = (((_a = conversation === null || conversation === void 0 ? void 0 : conversation.lastMessage) === null || _a === void 0 ? void 0 : _a.unread) || 0) + 1;
                    console.log(`User message. Incrementing unread count to ${newUnreadCount} for conversation ${msg.conversationId}`);
                }
                yield ConversationModel_1.ConversationModel.findByIdAndUpdate(msg.conversationId, {
                    lastMessage: {
                        text: msg.text,
                        time: msg.createdAt,
                        unread: newUnreadCount,
                    },
                });
                io.to(convId).emit("recieve_message", msg);
                const totalUnread = yield calculateTotalUnreadMessages(adminId);
                io.emit("update conversation", adminId);
                // io.to(adminId).emit("notify", totalUnread);
            }
            catch (error) {
                console.error('Error processing chat message:', error);
            }
        }));
        socket.on("notify", (adminId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const totalUnreadCount = yield calculateTotalUnreadMessages(adminId);
                console.log(`Notify: ${totalUnreadCount}`);
                console.log(adminId);
                io.to(adminId._id).emit("notify", totalUnreadCount);
                io.to(adminId).emit("notify", totalUnreadCount);
            }
            catch (error) {
                console.error('Error in notify:', error);
            }
        }));
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
        socket.on("webrtc-answer", (data) => __awaiter(this, void 0, void 0, function* () {
            // console.log("Received WebRTC answer:", data);
            io.to(data.room).emit("webrtc-answer", data);
        }));
        socket.on("webrtc-ice-candidate", (data) => {
            // console.log("Received WebRTC ICE candidate:", data);
            io.to(data.room).emit("webrtc-ice-candidate", data.candidate);
        });
        socket.on("webrtc-disconnect", (conId, callerId) => {
            console.log(conId, callerId + "💕💕💕💕💕💕");
            io.to(conId).emit('webrtc-disconnect', conId, callerId);
        });
        socket.on("end-call", (data) => {
        });
    });
    return io;
}
exports.initializeSocket = initializeSocket;
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
function calculateTotalUnreadMessages(adminId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversations = yield ConversationModel_1.ConversationModel.find({ adminId });
            return conversations.reduce((total, conversation) => { var _a; return total + (((_a = conversation === null || conversation === void 0 ? void 0 : conversation.lastMessage) === null || _a === void 0 ? void 0 : _a.unread) || 0); }, 1);
        }
        catch (error) {
            console.error('Error calculating total unread messages:', error);
            return 0;
        }
    });
}
