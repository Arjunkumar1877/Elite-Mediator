import { User } from "../../entities/models/user/User";
import { ICheckAndsaveVerifiedUseUseCase } from "../../entities/useCasesInterfaces/user/ICheckAndsaveVerifiedUseUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class CheckAndSaveVerifiedUseUseCase implements ICheckAndsaveVerifiedUseUseCase{
    constructor(private iuserrepository: IUserRepository){};

    async CheckAndSaveVerifiedUser(user: User): Promise<any> {
        const existingUser: User = await this.iuserrepository.FindByPhoneAndPropId(user.phone, user.propId);
        
        if(existingUser){
            return existingUser;
        }else{
            const userCreated: any = await this.iuserrepository.CreateNewUser(user);
            if(userCreated){
                const userData: any = await this.iuserrepository.FindUserByIdPopulateAdminData(userCreated._id);
                return userData;
            }
        }
    }
}

