import { User } from "../../models/user/User";

export interface IGetUserDataByIdUseCase{
    GetTheUserDataById(userId: string): Promise<User | null>;
}