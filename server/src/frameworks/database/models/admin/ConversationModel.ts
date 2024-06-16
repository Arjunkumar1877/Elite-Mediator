import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  propertyId: {
    type: String,
  },
}, { timestamps: true });


export const ConversationModel = mongoose.model('Conversation', conversationSchema);
