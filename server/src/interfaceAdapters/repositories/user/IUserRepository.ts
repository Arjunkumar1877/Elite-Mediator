import { User } from "../../../entities/models/admin/User";

export interface IUserRepository{
    CreateNewUser(user: User): Promise<User | null>;
    FindUserByUserId(userId: string): Promise<User | null>;
    FindUserByPhone(phone: number): Promise<User | null>;
    FindByIdAndVerify(userId: string): Promise<User>;
}