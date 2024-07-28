import { Message } from "../../entities/models/common/Message";
import { ISendAndCreateUserMessageUseCase } from "../../entities/useCasesInterfaces/user/ISendAndCreateUserMessageUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class SendAndCreateUserMessageUseCase implements ISendAndCreateUserMessageUseCase{
 constructor(private iuserRepository: IUserRepository){};

 async SendNewMessageByUser(message: Message): Promise<Message> {
    console.log(message)
    console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
    const userData: any = await this.iuserRepository.FindUserByUserId(message.senderId);
    if(userData && userData.deleted === true){
        const updateConversation: any = await this.iuserRepository.FindConversationAndUpdateDeleted(userData?.conversationId);
        const updateUser: any = await this.iuserRepository.FindUserAndUpdateDeletedUser(message.senderId);
        console.log(updateConversation);
        console.log(updateUser)
    }
     const newMessage: any = await this.iuserRepository.CreateUserNewMessageToDb(message);

     return newMessage
 }
}