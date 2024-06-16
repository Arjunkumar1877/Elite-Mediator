import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['User', 'Admin'],
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export const MessageModel = mongoose.model('Message', messageSchema);
