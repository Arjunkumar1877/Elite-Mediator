import { User } from "../../models/user/User";

export interface ICheckAndsaveVerifiedUseUseCase{
   CheckAndSaveVerifiedUser(user: User): Promise<User>;
}