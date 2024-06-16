import { ICreateConversationUseCase } from "../../entities/useCasesInterfaces/user/ICreateConversationUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";



export class CreateConversationUseCase implements ICreateConversationUseCase{

    constructor(private iuserrepository: IUserRepository){};

     async CreateConvesationUseCase(userId: string, adminId: string, propertyId: string): Promise<any> {
          const exisitingConversation = await this.iuserrepository.FindConversation(userId, adminId, propertyId);
        
          if(!exisitingConversation){
            const newConversationCreate = await this.iuserrepository.CreateConversation(userId, adminId, propertyId);
            return newConversationCreate;

          }else{
            return exisitingConversation;
          }
    }
}