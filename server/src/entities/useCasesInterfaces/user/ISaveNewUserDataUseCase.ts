import { User } from "../../models/user/User";

export interface ISaveNewUserDataUseCase{
    SaveNewUser(user: User): Promise<User>;
}