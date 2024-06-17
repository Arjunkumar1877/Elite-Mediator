import { Conversation } from "../../../entities/models/common/Conversation";
import { Message } from "../../../entities/models/common/Message";

export interface ICommonRepository{
    CreateNewMessageToDb(message: Message): Promise<Message>;
    GetConversationFromDb(conversationId: string): Promise<Conversation | null>;
    GetMessagesFromDb(conversationId: string): Promise<Message[] | null>;
}