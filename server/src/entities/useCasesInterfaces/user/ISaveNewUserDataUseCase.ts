import { User } from "../../models/admin/User";

export interface ISaveNewUserDataUseCase{
    SaveNewUser(user: User): Promise<User>;
}