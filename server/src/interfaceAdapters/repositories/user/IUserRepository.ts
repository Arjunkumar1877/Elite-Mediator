import { PropertyData } from "../../../entities/models/admin/PropertyData";
import { Call } from "../../../entities/models/common/Call";
import { Conversation } from "../../../entities/models/common/Conversation";
import { Message } from "../../../entities/models/common/Message";
import { User } from "../../../entities/models/user/User";

export interface IUserRepository{
    CreateNewUser(user: User): Promise<User | null>;
    FindUserByUserId(userId: string): Promise<User | null>;
    FindUserByPhone(phone: number): Promise<User | null>;
    FindByIdAndVerify(userId: string): Promise<User>;
    FindByPhoneAndPropId(phone: number, propId: string): Promise<any>
    FindByPhoneAndPropIdAndDelete(phone: number, propId: string): Promise<any>;
    FindUserAndAddFcmToken(token: string, userId: string): Promise<any>;
    FindUserFcmToken(token: string, userId: string): Promise<any>;
    FindPropertyData(propId: string, adminId: string): Promise<PropertyData | null>;
    CreateConversation(userId: string, adminId: string, propertyId: string): Promise<any>;
    FindConversation(userId: string, adminId: string, propertyId: string): Promise<Conversation | null>;
    FindUserByMacId(macId: string, propId: string): Promise<User | null>;
    CreateUserNewMessageToDb(message: any): Promise<Message | any>;
    FindAndGetUserMessages(conId: string): Promise<any>;
    FindTheUserById(userId: string): Promise<User | null>;
    FindUserByIdPopulateAdminData(userId: string): Promise<any>;
    FindPropertyDataBypropIdAndAddScanCount(propId: string): Promise<string>;
    FindConversationAndUpdateDeleted(conId: string | undefined): Promise<any>;
    FindUserAndUpdateDeletedUser(userId: string): Promise<any>;
    CreateUserCallToDb(callData: Call): Promise<Call | any>;
    AcceptUserCallAndUpdatOnDb(id: string): Promise<Call | any>;
    DeclineUserCallAndUpdateOnDb(id: string): Promise<Call | any>;
    DisconnectUserCallAndUpdateOnDb(id: string): Promise<Call | any>;

}