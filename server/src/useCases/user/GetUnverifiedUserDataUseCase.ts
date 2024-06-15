import { IGetUnverifiedUserDataUseCase } from "../../entities/useCasesInterfaces/user/IGetUnverfiedUserDataUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class GetUserDataUseCase implements IGetUnverifiedUserDataUseCase{
    constructor(private iuserrepository: IUserRepository){};

     async GetUnverifiedUserData(userId: string): Promise<any> {
        return this.iuserrepository.FindUserByUserId(userId);
    }

     async GetTheUserDataByPhone(phone: number): Promise<any> {
        return this.iuserrepository.FindUserByPhone(phone)
    }
}