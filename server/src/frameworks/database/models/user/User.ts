import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    propId: {
        type: mongoose.Schema.Types.ObjectId,
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
    }
}, { timestamps: true });

export const UserModel = mongoose.model("User", userSchema);
