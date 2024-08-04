import { PropertyData } from "../../../entities/models/admin/PropertyData";
import { Call } from "../../../entities/models/common/Call";
import { Conversation } from "../../../entities/models/common/Conversation";
import { Message } from "../../../entities/models/common/Message";
import { User } from "../../../entities/models/user/User";
import { CallModel } from "../../../frameworks/database/models/admin/CallModel";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { QrModel } from "../../../frameworks/database/models/admin/QrDataModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { IUserRepository } from "./IUserRepository";

export class MongoUserRepository implements IUserRepository {
  async CreateNewUser(user: User): Promise<any> {
    return await UserModel.create(user);
  }

  async FindUserByUserId(userId: string): Promise<any> {
    const data = await UserModel.findOne({ _id: userId }).populate('adminId');
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

    console.log('😣😣😣🔥🔥🔥🔥📀📀📀📀 user verification')

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
    return await UserModel.findOne({ phone, propId }).populate('adminId');
  }

  async FindByPhoneAndPropIdAndDelete(
    phone: number,
    propId: string
  ): Promise<any> {
    return await UserModel.findOneAndDelete({ phone, propId });
  }
  
  async FindPropertyData(propId: string, adminId: string): Promise<PropertyData | any> {
    const data = await QrModel.findOne({adminId: adminId, propId: propId});
    return  data;
  }

  async FindPropertyDataBypropIdAndAddScanCount(propId: string): Promise<string> {
    const propertyData: any = await QrModel.findOne({ propId: propId });
  
    if (propertyData) {
      const updateProperty: any = await QrModel.findOneAndUpdate(
        { propId: propId },
        { $inc: { scannedCount: 1 } }, 
        { new: true }
      );
  
      if (updateProperty) {
        return "success";
      }
    }
  
    return "failed";
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
  
  async FindUserByMacId(macId: string, propId: string): Promise<any> {
   return await UserModel.findOne({macId: macId, propId: propId}).populate('adminId');   
  }

  async FindUserByIdPopulateAdminData(userId: string): Promise<any> {
    return await UserModel.findOne({_id: userId}).populate('adminId propId');   
  }

  async FindAndGetUserMessages(conId: string): Promise<any> {
   return  await MessageModel.find({conversationId: conId, userDeleted: false});   
  }

  async CreateUserNewMessageToDb(message: any): Promise<Message | any> {
    // console.log(message )
    // console.log("😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️")
      const newMessage = new MessageModel(message);
      const save =   await newMessage.save();

      return save;
  }

  async FindUserAndAddFcmToken(token: string, userId: string): Promise<any> {
    return await UserModel.findOneAndUpdate({_id: userId}, {
      $set: {
        fcmToken: token
      }
    }, {new: true});
  }

  async FindUserFcmToken(token: string, userId: string): Promise<any> {
    return await UserModel.findOne({_id: userId, fcmToken: token}).populate("adminId propId");
  }

  async FindTheUserById(userId: string): Promise<User | null> {
    return await UserModel.findOne({_id: userId});
  }

  async FindConversationAndUpdateDeleted(conId: string): Promise<any> {
    const updatedConversation = await ConversationModel.findOneAndUpdate({_id: conId}, {
      $set: {
        deleted: false
      }
    }, { new: true});

    if(updatedConversation){
      return 'updated'
    }else{
      return 'failed'
    }
  }

  async FindUserAndUpdateDeletedUser(userId: string): Promise<any> {
  const updateUser = await UserModel.findOneAndUpdate({_id: userId}, {
    $set: {
      deleted: false
    }
  }, {new: true});

  if(updateUser){
    return 'updated';
  }else{
    return 'failed';
  }

  }

   
  async CreateUserCallToDb(callData: Call): Promise<any> {
    return await CallModel.create(callData);
  }

  async AcceptUserCallAndUpdatOnDb(id: string): Promise<any> {
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

  async DisconnectUserCallAndUpdateOnDb(id: string): Promise<any> {
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

  async DeclineUserCallAndUpdateOnDb(id: string): Promise<any> {
    const call = await CallModel.findById(id);

    const update = await CallModel.findByIdAndUpdate(
      id,
      { callStatus: "declined" },
      { new: true }
    );

    return update;
  }
}
