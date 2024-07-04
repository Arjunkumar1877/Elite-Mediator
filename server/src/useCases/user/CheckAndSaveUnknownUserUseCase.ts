import { User } from "../../entities/models/user/User";
import { ICheckAndSaveUnknownUserUseCase } from "../../entities/useCasesInterfaces/user/ICheckAndSaveUnknownUserUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class CheckAndSaveUnknownUserUseCase implements ICheckAndSaveUnknownUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async CheckAndSaveTheUnknownUser(user: User): Promise<any> {
        try {
            // Ensure that macId and propId are provided
            if (!user?.macId || !user?.propId) {
                throw new Error("macId and propId are required fields.");
            }

            // Check if the user exists
            const userExists = await this.userRepository.FindUserByMacId(user.macId, user.propId);

            if (userExists) {
                console.log(userExists);
                console.log("exsisting")
                return userExists; // Return existing user if found
            } else {
                // Create a new user if not found
                const saveData = await this.userRepository.CreateNewUser(user);
                console.log("not exsisting")
                return saveData;
                
            }
        } catch (error) {
            console.error("Error in CheckAndSaveTheUnknownUser:", error);
            throw new Error("Failed to check and save the unknown user.");
        }
    }
}
