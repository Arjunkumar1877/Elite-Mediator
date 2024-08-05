"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderModel: {
        type: String,
        enum: ["User", "Admin"],
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userDeleted: {
        type: Boolean,
        default: false
    },
    adminDeleted: {
        type: Boolean,
        default: false
    }
});
exports.MessageModel = mongoose.model("Message", MessageSchema);
