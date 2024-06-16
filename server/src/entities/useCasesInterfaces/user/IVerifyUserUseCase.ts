import { User } from "../../models/user/User";

export interface IVerifyUserUseCase{
    FindUserAndUpdate(id: string): Promise<User>;
}