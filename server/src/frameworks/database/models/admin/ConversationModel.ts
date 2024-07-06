import mongoose from 'mongoose';

const { Schema } = mongoose;

const ConversationSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin', 
    required: true 
  },
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'QrModel', 
    required: true 
  },
  lastMessage: {
    text: { 
      type: String, 
      default: '' 
    },
    time: { 
      type: Date, 
      default: Date.now 
    },
    unread: {
      type: Number,
      default: 0
    }
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

export const ConversationModel = mongoose.model('Conversation', ConversationSchema);
