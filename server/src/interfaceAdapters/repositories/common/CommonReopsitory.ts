import { Call } from "../../../entities/models/common/Call";
import { Conversation } from "../../../entities/models/common/Conversation";
import { Message } from "../../../entities/models/common/Message";
import { CallModel } from "../../../frameworks/database/models/admin/CallModel";
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
      const messages = await MessageModel.find({ conversationId: conversationId, adminDeleted: false }).sort({ createdAt: 1 });
        // console.log(messages);
      return messages;
    }
    
    async CreateACallToDb(callData: Call): Promise<any> {
      return await CallModel.create(callData); 
    }

    async AcceptCallAndUpdatOnDb(id: string): Promise<any> {
      const update = await CallModel.findByIdAndUpdate(
        id,
        {
          callStarted: Date.now(),
          callStatus: 'answered',
        },
        { new: true }
      );
    
      return update;
    }

    async DisconnectCallAndUpdateOnDb(id: string): Promise<any> {
      const call = await CallModel.findById(id);
  
      const callEnded = new Date();
      const callStarted = call?.callStarted ? new Date(call.callStarted).getTime() : 0;
      const callDuration = callStarted ? callEnded.getTime() - callStarted : 0;
  
      const update = await CallModel.findByIdAndUpdate(
        id,
        {
          callEnded: callEnded,
          callDuration: callDuration,
        },
        { new: true }
      );

      return update;
    }

     async DeclineCallAndUpdateOnDb(id: string): Promise<any> {
      const call = await CallModel.findById(id);

    
      const update = await CallModel.findByIdAndUpdate(
        id,
        { callStatus: 'declined' },
        { new: true }
      );

      return update;
    }

}