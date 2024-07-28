import { User } from "../../entities/models/user/User";
import { ICheckAndSaveUnknownUserUseCase } from "../../entities/useCasesInterfaces/user/ICheckAndSaveUnknownUserUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class CheckAndSaveUnknownUserUseCase implements ICheckAndSaveUnknownUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async CheckAndSaveTheUnknownUser(user: User): Promise<any> {
        try {
           
            if (!user?.macId || !user?.propId) {
                throw new Error("macId and propId are required fields.");
            }

         
            const userExists: any = await this.userRepository.FindUserByMacId(user.macId, user.propId);

            if (userExists) {
                console.log(userExists);
                console.log("exsisting")
                return userExists; 
            } else {
                const saveData: any = await this.userRepository.CreateNewUser(user);
                console.log("not exsisting")
                if(saveData){
                    const userData: any = this.userRepository.FindUserByIdPopulateAdminData(saveData._id);
                    return userData;
                }
                
            }
        } catch (error) {
            console.error("Error in CheckAndSaveTheUnknownUser:", error);
            throw new Error("Failed to check and save the unknown user.");
        }
    }
}
