import { User } from "../../../entities/models/admin/User";

export interface IUserRepository{
    CreateNewUser(user: User): Promise<User | null>;
}