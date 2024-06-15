import { User } from "../../entities/models/admin/User";
import { IGetUserDataByPhoneUseCase } from "../../entities/useCasesInterfaces/user/IGetUserDataByPhoneUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class GetUserDataByPhoneUseCase implements IGetUserDataByPhoneUseCase{
    constructor(private iuserrepository: IUserRepository){};

    async FindUserDataByPhone(phone: number): Promise<User | null> {
        return this.iuserrepository.FindUserByPhone(phone);
    }
}