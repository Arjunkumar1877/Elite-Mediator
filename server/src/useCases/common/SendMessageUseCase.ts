import { Message } from "../../entities/models/common/Message";
import { ISendUserMessageUseCase } from "../../entities/useCasesInterfaces/common/ISendMessageUseCase";
import { ICommonRepository } from "../../interfaceAdapters/repositories/common/ICommonRepository";

export class SendMessageUseCase implements ISendUserMessageUseCase{

    constructor(private icommonrepository: ICommonRepository){};

    async SendMessages(message: Message): Promise<Message>{
      return this.icommonrepository.CreateNewMessageToDb(message);
    }
 }
 