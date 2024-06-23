import { Conversation } from "../../../entities/models/common/Conversation";
import { Message } from "../../../entities/models/common/Message";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { ICommonRepository } from "./ICommonRepository";



export class MongoCommonRepository implements ICommonRepository{
    async CreateNewMessageToDb(message: Message): Promise<Message | any> {
        const newMessage = new MessageModel(message);
        const save =   await newMessage.save();
  
        return save;
    }

    async GetConversationFromDb(conversationId: string): Promise<Conversation | any>{
      const conversation = await ConversationModel.findOne({ _id: conversationId });
  
      return conversation
    }

    async GetMessagesFromDb(conversationId: string): Promise<Message[] | any> {
      console.log("😣😣😣😣🔥🔥🔥🔥🔥 fetching messages in repository data");
      const messages = await MessageModel.find({ conversationId: conversationId }).sort({ createdAt: 1 });
        // console.log(messages);
      return messages;
    }



}