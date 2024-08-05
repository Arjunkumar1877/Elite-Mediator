"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: String,
    },
    landmark: {
        type: String,
    },
    firebaseConfirm: {
        type: String,
    },
    image: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    fcmToken: {
        type: [String],
        default: []
    },
    blocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.AdminModel = mongoose_1.default.model("Admin", AdminSchema);
