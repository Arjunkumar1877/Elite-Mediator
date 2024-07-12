import { Message } from "../../entities/models/common/Message";
import { ISendAndCreateUserMessageUseCase } from "../../entities/useCasesInterfaces/user/ISendAndCreateUserMessageUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class SendAndCreateUserMessage implements ISendAndCreateUserMessageUseCase{
 constructor(private iuserRepository: IUserRepository){};

 async SendNewMessageByUser(message: Message): Promise<Message> {
     const newMessage = await this.iuserRepository.CreateUserNewMessageToDb(message);

     return newMessage
 }
}