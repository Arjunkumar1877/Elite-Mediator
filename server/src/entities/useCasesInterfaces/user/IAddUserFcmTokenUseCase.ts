import { User } from "../../models/user/User";

export interface IAddUserFcmTokenUseCase{
    AddUserFcmToken(userId: string, token: string): Promise<User>;
}