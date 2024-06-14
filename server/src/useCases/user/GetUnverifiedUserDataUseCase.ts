import { IGetUnverifiedUserDataUseCase } from "../../entities/useCasesInterfaces/user/IGetUnverifiedUserDataUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class GetUnverifiedUserDataUseCase implements IGetUnverifiedUserDataUseCase{
    constructor(private iuserrepository: IUserRepository){};

     async GetUnverifiedUserData(userId: string): Promise<any> {
        return this.iuserrepository.FindUserByUserId(userId);
    }
}