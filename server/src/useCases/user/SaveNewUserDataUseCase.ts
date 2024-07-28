import { User } from "../../entities/models/user/User";
import { ISaveNewUserDataUseCase } from "../../entities/useCasesInterfaces/user/ISaveNewUserDataUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";




export class SaveNewUserDataUseCase implements ISaveNewUserDataUseCase{

    constructor(private iuserrepository: IUserRepository){};

    async SaveNewUser(user: User): Promise<any> {
        const newUser: any = this.iuserrepository.CreateNewUser(user);

        if(newUser){
            const userData: any = this.iuserrepository.FindUserByIdPopulateAdminData(newUser._id)
            return userData
        }
    }
}