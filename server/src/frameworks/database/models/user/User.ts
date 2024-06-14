import mongoose from "mongoose";


const usreSchema =  new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    adminId: {
        type: String,
        required: true
    },
    propId: {
        type: String,
        required: true
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
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
});


export const UserModel = mongoose.model("User", usreSchema);


