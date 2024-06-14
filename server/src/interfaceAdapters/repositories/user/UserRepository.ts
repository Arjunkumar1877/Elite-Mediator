import { User } from "../../../entities/models/admin/User";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { IUserRepository } from "./IUserRepository";


export class MongoUserRepository implements IUserRepository{
    async CreateNewUser(user: User): Promise<any> {
        return await UserModel.create(user);
    }

    async FindUserByUserId(userId: string): Promise<any> {
        const data = await UserModel.find({userId: userId});
        return data;
    }

    async UpdateUserData(userId: string): Promise<any> {
        const savedData = await UserModel.findOneAndUpdate({userId: userId}, {
            $set: {
                verified: true
            }
        })

        if(savedData){
            const data = await UserModel.findOne({userId: userId});
            return data;
        }
    }
    
}