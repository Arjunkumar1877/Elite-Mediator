import { ObjectId } from "mongoose";
import { Admin } from "../../../entities/models/admin/Admin";
import { AdminModel } from "../../../frameworks/database/models/admin/AdminModel";
import { IAdminRepository } from "./IAdminRepository";
import { QrModel } from "../../../frameworks/database/models/admin/QrDataModel";
import { PropertyData } from "../../../entities/models/admin/PropertyData";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { Conversation } from "../../../entities/models/common/Conversation";
import moment from "moment";
import { CallModel } from "../../../frameworks/database/models/admin/CallModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";

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

  async FindAdminsPropertDatas(id: string): Promise<PropertyData[] | null> {
    return await QrModel.find({ adminId: id });
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
      let query: any = { adminId: adminId };

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

  async FindAdminsCallListByAdminId(adminId: string): Promise<any> {
    const calles = await CallModel.find({ adminId: adminId })
      .populate("userId")
      .sort({ createdAt: -1 });
    return calles;
  }

  async FindUsersListByAdminId(adminId: string): Promise<any> {
    const userData = await UserModel.find({ adminId: adminId, deleted: false })
      .sort({ createdAt: -1 })
      .populate("propId");

    if (userData.length > 0) {
      return userData;
    } else {
      return "Empty list";
    }
  }

  async FindAndEditUnknownUser(userId: string, username: string): Promise<any> {
    const editedUserdata = await UserModel.findOneAndUpdate({_id: userId}, {
      $set: {
          username: username
      }
  }, { new: true});

  if(editedUserdata){
      return editedUserdata
  }else{
      return ''
  }
  }

  async FindAndClearAdminChatMessages(conId: string): Promise<any> {
    const result = await MessageModel.updateMany(
      { conversationId: conId },
      { $set: { adminDeleted: true } }
  );

  return result;

  }

 
}
