import { PropertyData } from "../../../entities/models/admin/PropertyData";
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
    FindPropertyData(propId: string, adminId: string): Promise<PropertyData | null>;
    CreateConversation(userId: string, adminId: string, propertyId: string): Promise<any>;
    FindConversation(userId: string, adminId: string, propertyId: string): Promise<Conversation | null>;
    FindUserByMacId(macId: string, propId: string): Promise<User | null>;
}