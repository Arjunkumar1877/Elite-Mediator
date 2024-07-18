"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const callSchema = new mongoose_1.default.Schema({
    conversationId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    adminId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caller: {
        type: String,
        enum: ["User", "Admin"],
        required: true
    },
    receiver: {
        type: String,
        enum: ["User", "Admin"],
        required: true
    },
    callStatus: {
        type: String,
        enum: ["declined", "answered", "missed"]
    },
    callType: {
        type: String,
        enum: ["audio", 'video']
    },
    callStarted: {
        type: Date
    },
    callEnded: {
        type: Date
    },
    callDuration: {
        type: Number
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.CallModel = mongoose_1.default.model("Call", callSchema);
