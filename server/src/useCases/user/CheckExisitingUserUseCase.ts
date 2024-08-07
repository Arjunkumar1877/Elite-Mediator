import { User } from "../../entities/models/user/User";
import { ICheckExisitingUserUseCase } from "../../entities/useCasesInterfaces/user/ICheckExisitingUserUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class CheckExisitingUserUseCase implements ICheckExisitingUserUseCase {
    constructor(private iuserrepository: IUserRepository) {}
  
    async CheckExisitingUser(phone: number, propId: string, adminId: string): Promise<string | User> {
      const user: any = await this.iuserrepository.FindByPhoneAndPropId(phone, propId)
  
      if (user) {
       if(user.verified){
        return user;
    
       }else{
        const userdeleted: any = await this.iuserrepository.FindByPhoneAndPropIdAndDelete(phone, propId);
        console.log(userdeleted)
        return "user not verified"
       }        
        
      } else {
        return 'user does not exist';
      }
    }
  }
  