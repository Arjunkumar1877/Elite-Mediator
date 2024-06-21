import { User } from "../../entities/models/user/User";
import { IVerifyUserUseCase } from "../../entities/useCasesInterfaces/user/IVerifyUserUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class VerifyUserUseCase implements IVerifyUserUseCase{
    constructor(private iuserRepository: IUserRepository){};
    
    async FindUserAndUpdate(userId: string): Promise<User> {
   

        const userData = await this.iuserRepository.FindUserByUserId(userId);

        if(userData?.verified){
            console.log("user already verified and data sended")
            return userData;
        }else{
            console.log("user  verified now and data sended")

            return this.iuserRepository.FindByIdAndVerify(userId);

        }


        


    }
}