import { User } from "../../models/user/User";

export interface ICheckExisitingUserUseCase{
    CheckExisitingUser(phone: number, propId: string, adminId: string): Promise<User  | string>
}