import { Message } from "../../entities/models/common/Message";
import { IGetMessageUseCase } from "../../entities/useCasesInterfaces/common/IGetMessagesUseCase";
import { ICommonRepository } from "../../interfaceAdapters/repositories/common/ICommonRepository";


export class GetMessagesUseCase implements IGetMessageUseCase{
    constructor(private icommonrepository: ICommonRepository){};

    async GetMessages(conversationId: string): Promise<Message[] | null | string>{

        const conversation = await this.icommonrepository.GetConversationFromDb(conversationId);

        if(conversation){
            const messages = await this.icommonrepository.GetMessagesFromDb(conversationId);

            return messages
        }else{
            return 'No conversation Id or conversation exsists'
        }      
    }
}