import { Conversation } from "../../../entities/models/user/Conversation";
import { User } from "../../../entities/models/user/User";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { IUserRepository } from "./IUserRepository";

export class MongoUserRepository implements IUserRepository {
  async CreateNewUser(user: User): Promise<any> {
    return await UserModel.create(user);
  }

  async FindUserByUserId(userId: string): Promise<any> {
    const data = await UserModel.findOne({ _id: userId });
    return data;
  }

  async FindByIdAndVerify(userId: string): Promise<any> {
    const savedData = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          verified: true,
        },
      }
    );

    if (savedData) {
      return savedData;
    } else {
      return "User data unavailable";
    }
  }

  async FindUserByPhone(phone: number): Promise<User | null> {
    return await UserModel.findOne({ phone: phone });
  }

  async FindByPhoneAndPropId(phone: number, propId: string): Promise<any> {
    return await UserModel.findOne({ phone, propId });
  }

  async FindByPhoneAndPropIdAndDelete(
    phone: number,
    propId: string
  ): Promise<any> {
    return await UserModel.findOneAndDelete({ phone, propId });
  }

  async CreateConversation(
    userId: string,
    adminId: string,
    propertyId: string
  ): Promise<any> {
    const save = await ConversationModel.create({
      userId,
      adminId,
      propertyId,
    });
    if (save) {
      const userFindUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            conversationId: save._id,
          },
        },
        { new: true }
      );
      if (userFindUser) {
        console.log("user updated with conversation ID");
      }
    }
    return save;
  }

  async FindConversation(
    userId: string,
    adminId: string,
    propertyId: string
  ): Promise<Conversation | null> {
    return await ConversationModel.findOne({ userId, adminId, propertyId });
  }
}
