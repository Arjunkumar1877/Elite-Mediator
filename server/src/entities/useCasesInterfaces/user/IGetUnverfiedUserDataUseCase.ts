import { User } from "../../models/admin/User";

export interface IGetUnverifiedUserDataUseCase{
    GetUnverifiedUserData(userId: string): Promise<User | null>;
}