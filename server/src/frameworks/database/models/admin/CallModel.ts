import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  callerId: {
   type: mongoose.Types.ObjectId,
   required: true
  },
  callerModel: { 
    type: String, 
    enum: ["User", "Admin"], 
    required: true 
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  receiverModel:  {
    type: String, 
    enum: ["User", "Admin"], 
    required: true 
  },
  callStatus: {
    type: String,
    enum: ["declined", "answered", "missed", "canceled"]
  },
  callType: {
    type: String,
    enum: ["outgoing", 'incomming']
  },
  callStarted: {
    type: Date
  },
  callEnded: {
    type: Date
  },
  callDuration: {
    type: Number
  }
});

export const CallModel = mongoose.model("Call", callSchema);
