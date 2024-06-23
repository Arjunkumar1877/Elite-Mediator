import mongoose from 'mongoose';


const unreadMessageSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

export const UnreadMessageModel = mongoose.model('AdminNotfication', unreadMessageSchema);