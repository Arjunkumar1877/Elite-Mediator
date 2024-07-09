import { User } from "../../models/user/User";


export interface IEditUnknownUsernameUseCase {
  EditUnknownUsername(userId: string, username: string): Promise<User>;
}