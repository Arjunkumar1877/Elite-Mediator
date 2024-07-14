import { Message } from "../../entities/models/common/Message";
import { ISendAndCreateUserMessageUseCase } from "../../entities/useCasesInterfaces/user/ISendAndCreateUserMessageUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class SendAndCreateUserMessageUseCase implements ISendAndCreateUserMessageUseCase{
 constructor(private iuserRepository: IUserRepository){};

 async SendNewMessageByUser(message: Message): Promise<Message> {
    console.log(message)
    console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
    const userData = await this.iuserRepository.FindUserByUserId(message.senderId);
    if(userData && userData.deleted === true){
        const updateConversation = await this.iuserRepository.FindConversationAndUpdateDeleted(userData?.conversationId);
        const updateUser = await this.iuserRepository.FindUserAndUpdateDeletedUser(message.senderId);
    }
     const newMessage = await this.iuserRepository.CreateUserNewMessageToDb(message);

     return newMessage
 }
}