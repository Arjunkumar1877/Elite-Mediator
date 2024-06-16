import { User } from "../../models/user/User";

export interface IGetUnverifiedUserDataUseCase{
    GetUnverifiedUserData(userId: string): Promise<User | null>;
}