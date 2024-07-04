import { User } from "../../models/user/User";

export interface ICheckAndSaveUnknownUserUseCase{
    CheckAndSaveTheUnknownUser(user: User): Promise<any>;
} 