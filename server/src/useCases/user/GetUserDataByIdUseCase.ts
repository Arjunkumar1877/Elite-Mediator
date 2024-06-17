import { IGetUserDataByIdUseCase } from "../../entities/useCasesInterfaces/user/IGetUserDataByIdUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class GetUserDataByIdUseCase implements IGetUserDataByIdUseCase{
    constructor(private iuserrepository: IUserRepository){};

     async GetTheUserDataById(userId: string): Promise<any> {
        return this.iuserrepository.FindUserByUserId(userId);
    }
}