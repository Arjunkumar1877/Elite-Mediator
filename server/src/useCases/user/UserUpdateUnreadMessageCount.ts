import { User } from "../../entities/models/user/User";
import { IUserUpdateUnreadMessageCount } from "../../entities/useCasesInterfaces/user/IUserUpdateUnreadMessageCount";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class UserUpdateUnreadMessageCount implements IUserUpdateUnreadMessageCount{
   constructor(private iuserrepository: IUserRepository){};

   async UpdateTheunreadMessageCount(userId: string): Promise<string> {
    //    const updatedData = 
       return "haii"
   }
}