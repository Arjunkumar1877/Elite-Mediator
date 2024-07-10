import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  adminId: {
    type: mongoose.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caller: { 
    type: String, 
    enum: ["User", "Admin"], 
    required: true 
  },
  receiver:  {
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
}, { timestamps: true});

export const CallModel = mongoose.model("Call", callSchema);
