export interface Message{
  _id?: string;
  conversationId: string;
  senderId: string;
  senderModel: string;
  type: 'text' | string;
  text: string;
  userDeleted?: boolean;
  adminDeleted?: boolean;
}