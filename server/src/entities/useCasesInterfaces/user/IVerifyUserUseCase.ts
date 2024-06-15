import { User } from "../../models/admin/User";

export interface IVerifyUserUseCase{
    FindUserAndUpdate(id: string): Promise<User>;
}