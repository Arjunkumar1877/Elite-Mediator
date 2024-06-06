import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true       
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    state: {
     type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    firebaseConfirm: {
        type: String
    },
    image:{
        type: String
    },
    verified: {
        type:Boolean,
    default: false
}
}, {timestamps: true})


export const AdminModel = mongoose.model('Admin', AdminSchema);
