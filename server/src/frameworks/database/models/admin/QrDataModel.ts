import mongoose from "mongoose";


const qrDataSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true
    },
    propId: {
        type: String,
        required: true,
        unique: true
    },
    propertyName:{
        type: String,
        required: true,
        unique: true
    },
    propertyAddress: {
        type: String,
        required: true,
    },
    allowVedioCalls: {
        type: Boolean,
        required: true
    },
    verifyUsers: {
        type: Boolean,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: true});


export const QrModel = mongoose.model('qrdata', qrDataSchema);
