import { Admin } from "../../../entities/models/admin/Admin";
import { AdminModel } from "../../../frameworks/database/models/admin/AdminModel";
import { IAdminRepository } from "./IAdminRepository";
import { QrModel } from "../../../frameworks/database/models/admin/QrDataModel";
import { PropertyData } from "../../../entities/models/admin/PropertyData";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { Conversation } from "../../../entities/models/common/Conversation";
import { CallModel } from "../../../frameworks/database/models/admin/CallModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { Message } from "../../../entities/models/common/Message";
import { GraphDataType } from "../../../entities/useCasesInterfaces/admin/IUserStatisticsGraphDataUseCase";
import { User } from "../../../entities/models/user/User";
import { Call } from "../../../entities/models/common/Call";

export class MongoAdminRepository implements IAdminRepository {
  async CreateAdmin(admin: Admin): Promise<any> {
    console.log("repository file mongo db functions 🤷‍♂️🤷‍♂️🤷‍♂️");
    return AdminModel.create(admin);
  }

  async GetUnverifiedAdmin(phone: number): Promise<any> {
    return AdminModel.findOne({ phone });
  }

  async FindAdminByPhone(phone: number): Promise<Admin | null> {
    return await AdminModel.findOne({ phone });
  }

  async UpdateUnverifiedAdmin(
    firebaseCode: string,
    phone: number
  ): Promise<any> {
    const update = await AdminModel.findOneAndUpdate(
      { phone: phone },
      { $set: { firebaseConfirm: firebaseCode } },
      { new: true }
    );

    return update;
  }

  async FindAdminByEmail(email: string): Promise<any> {
    const adminExist = await AdminModel.findOne({ email });
    return adminExist;
  }

  async GoogleOAuth(admin: Admin): Promise<any> {
    const newUser = await AdminModel.create(admin);
    newUser.verified = true;
    newUser.save();

    return newUser;
  }

  async FindAdminAndAddFcmToken(token: string, adminId: string): Promise<any> {
    const data = await AdminModel.findOneAndUpdate(
      { _id: adminId },
      {
        $set: {
          fcmToken: token,
        },
      }
    );

    return data;
  }

  async FindAdminFcmToken(token: string, adminId: string): Promise<any> {
    return await AdminModel.findOne({ _id: adminId, fcmToken: token });
  }

  async UpdateAdminData(admin: Admin, id: string): Promise<Admin | null> {
    return await AdminModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          username: admin.username,
          email: admin.email,
          phone: admin.phone,
          address: admin.address,
          state: admin.state,
          city: admin.city,
          pincode: admin.pincode,
          landmark: admin.landmark,
          image: admin.image,
        },
      },
      { new: true }
    );
  }

  async FindAdminById(id: any): Promise<any> {
    console.log("😂");
    const adminData = await AdminModel.findOne({ _id: id });
    return adminData;
  }

  async CreatePropertyData(propertyData: PropertyData): Promise<any> {
    return await QrModel.create(propertyData);
  }

  async FindAdminsPropertDatas(
    adminId: string
  ): Promise<PropertyData[] | null> {
    return await QrModel.find({ adminId: adminId, deleted: false });
  }

  async FindAdminsPropertDatasForFilter(
    adminId: string
  ): Promise<PropertyData[] | null> {
    return await QrModel.find({ adminId: adminId });
  }

  async FindConversationById(id: string): Promise<Conversation | null> {
    console.log(
      "Finding admin singleConversation by conversation id 💕💕💕💕💕🔥🔥🔥🔥🔥"
    );
    return await ConversationModel.findById(id);
  }

  async UpdateLastMessageUnreadToZero(
    id: string,
    text: string,
    time: Date,
    unread: number
  ): Promise<Conversation | any> {
    try {
      console.log("Updating conversation...");

      const updateCon = await ConversationModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "lastMessage.text": text,
            "lastMessage.time": time,
            "lastMessage.unread": unread,
          },
        },
        { new: true }
      );

      if (updateCon) {
        console.log("Updated conversation 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
      } else {
        console.log("No conversation found with the provided ID.");
      }

      return updateCon;
    } catch (error) {
      console.error("Error updating conversation:", error);
      throw new Error("Failed to update conversation");
    }
  }

  async FindAdminsConversationsByAdminId(
    adminId: string
  ): Promise<Conversation[] | any> {
    try {
      console.log(
        "Finding conversations of the admin by using adminId 😣😣😣💕💕💕"
      );

      const conversations = await ConversationModel.find({ adminId: adminId });

      if (conversations.length === 0) {
        console.log("No conversations found for the given admin ID.");
      } else {
        console.log(
          `Found ${conversations.length} conversations for the admin.`
        );
      }

      return conversations;
    } catch (error) {
      console.error("Error finding conversations by admin ID:", error);
      throw new Error("Failed to find conversations by admin ID");
    }
  }

  async FindSelectedConversation(id: string): Promise<any> {
    try {
      const conversation = await ConversationModel.findOne({
        _id: id,
      }).populate("userId propertyId");

      return conversation;
    } catch (error) {
      console.error("Error finding conversations by admin ID:", error);
      throw new Error("Failed to find the selected conversation  by admin ID");
    }
  }

  async FilterConversationList(
    adminId: string,
    page: number,
    propertyFilter: string,
    startDate: any,
    endDate: any
  ): Promise<any> {
    try {
      let query: any = { adminId: adminId, deleted: false };

      const limit = 10;

      if (propertyFilter && propertyFilter !== "All") {
        query.propertyId = propertyFilter;
      }

      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const conversations = await ConversationModel.find(query)
        .populate("userId propertyId")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ updatedAt: -1 });

      return conversations;
    } catch (error) {
      console.log(error);
    }
  }

  async FindConversationListCount(adminId: string): Promise<any> {
    let filterQuery: any = { adminId };

    const totalConversations = await ConversationModel.countDocuments(
      filterQuery
    );
    return totalConversations;
  }

  async FindAdminsCallListByAdminId(adminId: string, page: number): Promise<any> {
    let limit: number  = 10;
    const calles = await CallModel.find({ adminId: adminId }).skip((page - 1) * limit)
    .limit(limit)
      .populate("userId")
      .sort({ createdAt: -1 });
    return calles;
  }

  async FindTotalCountOftheCallList(adminId: string): Promise<number | null> {
    const count = await CallModel.find({adminId: adminId}).countDocuments();
    return count;
  }

  async FindUsersListByAdminId(
    adminId: string,
    startDate: string,
    endDate: string,
    propertyName: string,
    userType: string
  ): Promise<any> {
    if (propertyName === "All" || userType === "All") {
      const users = await UserModel.find({
        adminId: adminId,
        updatedAt: -1,
        deleted: false,
      }).populate("propId");

      return users;
    }

    const filter: any = {
      adminId: adminId,
      deleted: false,
    };

    if (startDate) {
      filter.createdAt = { $gte: new Date(startDate) };
    }
    if (endDate) {
      filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate) };
    }
    if (propertyName) {
      filter.propId = propertyName;
    }

    if (userType) {
      const properties = await QrModel.find({ userType });
      const propertyIds = properties.map((property) => property._id);
      filter.propId = { $in: propertyIds };
    }

    const users = await UserModel.find(filter).populate("propId");

    if (users.length > 0) {
      return users;
    } else {
      return "Empty list";
    }
  }

  async FindAndEditUnknownUser(userId: string, username: string): Promise<any> {
    const editedUserdata = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username: username,
        },
      },
      { new: true }
    );

    if (editedUserdata) {
      return editedUserdata;
    } else {
      return "";
    }
  }

  async FindAndClearAdminChatMessages(conId: string): Promise<any> {
    const result = await MessageModel.updateMany(
      { conversationId: conId },
      { $set: { adminDeleted: true } }
    );

    return result;
  }

  async CreateAdminNewMessageToDb(message: Message): Promise<Message | any> {
    console.log(message);
    console.log(
      "😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂❤️❤️❤️❤️❤️Admin send message an dsave to db"
    );
    const newMessage = new MessageModel(message);
    const save = await newMessage.save();

    return save;
  }

  async FindUserStaticsDataOfAdminById(
    adminId: string
  ): Promise<GraphDataType> {
    const filterUnknown: any = {
      adminId: adminId,
    };
    const filterVerified: any = {
      adminId: adminId,
    };
    const filterUnVerified: any = {
      adminId: adminId,
    };

    const verifiedProperties = await QrModel.find({ userType: "Verified" });
    const verifiedPropertyIds = verifiedProperties.map(
      (property) => property._id
    );
    filterVerified.propId = { $in: verifiedPropertyIds };

    const unknonProperties = await QrModel.find({ userType: "Unknown" });
    const unknownPropertyIds = unknonProperties.map((property) => property._id);
    filterUnknown.propId = { $in: unknownPropertyIds };

    const unverifiedProperties = await QrModel.find({ userType: "Unverified" });
    const unverifiedPropertyIds = unverifiedProperties.map(
      (property) => property._id
    );
    filterUnVerified.propId = { $in: unverifiedPropertyIds };

    const All: number = await UserModel.find({
      adminId: adminId,
    }).countDocuments();
    const unknown: number = await UserModel.find(
      filterVerified
    ).countDocuments();
    const verified: number = await UserModel.find(
      filterUnknown
    ).countDocuments();
    const unVerified: number = await UserModel.find(
      filterUnVerified
    ).countDocuments();

    return { All, unknown, verified, unVerified };
  }

  async FindUserByUserId(userId: string): Promise<User | null> {
    return await UserModel.findOne({ _id: userId });
  }

  async FindUserByIdAndDelete(userId: string): Promise<string> {
    const deleted = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          deleted: true,
        },
      },
      { new: true }
    );
    return deleted ? "Deleted" : "Failed";
  }

  async FindConversationByIdAndDelete(conId: string): Promise<string> {
    const deleted = await ConversationModel.findOneAndUpdate(
      { _id: conId },
      {
        deleted: true,
      },
      { new: true }
    );
    return deleted ? "Deleted" : "Failed";
  }

  async FindAllAdminMessages(conId: string): Promise<any> {
    const messages = await MessageModel.find({
      conversationId: conId,
      adminDeleted: false,
    }).sort({ createdAt: 1 });

    return messages
  }

  async CreateAdminCallToDb(callData: Call): Promise<any> {
    return await CallModel.create(callData);
  }

  async AcceptAdminCallAndUpdatOnDb(id: string): Promise<any> {
    const update = await CallModel.findByIdAndUpdate(
      id,
      {
        callStarted: Date.now(),
        callStatus: "answered",
      },
      { new: true }
    );

    return update;
  }

  async DisconnectAdminCallAndUpdateOnDb(id: string): Promise<any> {
    const call = await CallModel.findById(id);

    const callEnded = new Date();
    const callStarted = call?.callStarted
      ? new Date(call.callStarted).getTime()
      : 0;
    const callDuration = callStarted ? callEnded.getTime() - callStarted : 0;

    const update = await CallModel.findByIdAndUpdate(
      id,
      {
        callEnded: callEnded,
        callDuration: callDuration,
      },
      { new: true }
    );

    return update;
  }

  async DeclineAdminCallAndUpdateOnDb(id: string): Promise<any> {
    const call = await CallModel.findById(id);

    const update = await CallModel.findByIdAndUpdate(
      id,
      { callStatus: "declined" },
      { new: true }
    );

    return update;
  }

  async FindPropertyByIdAndDelete(propId: string): Promise<any> {
    const deletedQr: any  = await QrModel.findOneAndUpdate({_id: propId}, {
      deleted: true
  });
  return deletedQr;
  }
}
