import mongoose from 'mongoose';
const schema = mongoose.Schema;


const conversationSchema  = new schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, {timestamps: true});



export const Conversation = mongoose.model("Conversation", conversationSchema);