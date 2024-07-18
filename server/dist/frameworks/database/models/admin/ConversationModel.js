"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ConversationSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    propertyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'QrModel',
        required: true
    },
    lastMessage: {
        text: {
            type: String,
            default: ''
        },
        time: {
            type: Date,
            default: Date.now
        },
        unread: {
            type: Number,
            default: 0
        }
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.ConversationModel = mongoose_1.default.model('Conversation', ConversationSchema);
