import { User } from "../../../entities/models/admin/User";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { IUserRepository } from "./IUserRepository";


export class MongoUserRepository implements IUserRepository{
    async CreateNewUser(user: User): Promise<any> {
        return await UserModel.create(user);
    }
}