import { User } from "../../models/user/User";

export interface IUserUpdateUnreadMessageCount{
   UpdateTheunreadMessageCount(userId: string): Promise<string>;
}