"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true
    },
    adminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    propId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'QrModel',
        required: true
    },
    conversationId: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    firebaseCode: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    macId: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    fcmToken: {
        type: String
    }
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model("User", userSchema);
