import { User } from "../../models/user/User";

export interface ICheckAndSaveUnverifiedUserUseCase{
 CheckAndCreateUnverifiedUser(user: User): Promise<User>;
}