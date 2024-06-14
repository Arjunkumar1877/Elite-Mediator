import { User } from "../../entities/models/admin/User";
import { ISaveNewUserDataUseCase } from "../../entities/useCasesInterfaces/user/ISaveNewUserDataUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";




export class SaveNewUserDataUseCase implements ISaveNewUserDataUseCase{

    constructor(private iuserrepository: IUserRepository){};

    async SaveNewUser(user: User): Promise<any> {
        return this.iuserrepository.CreateNewUser(user)
    }
}