import { User } from "../../entities/models/admin/User";
import { IVerifyUserUseCase } from "../../entities/useCasesInterfaces/user/IVerifyUserUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class VerifyUserUseCase implements IVerifyUserUseCase{
    constructor(private iuserRepository: IUserRepository){};
    
    async FindUserAndUpdate(userId: string): Promise<User> {
        return this.iuserRepository.FindByIdAndVerify(userId)
    }
}