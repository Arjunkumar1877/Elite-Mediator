import { Admin } from "../../../entities/models/admin/Admin";
import { PropertyData } from "../../../entities/models/admin/PropertyData";
import { Conversation } from "../../../entities/models/common/Conversation";

export interface IAdminRepository {
    CreateAdmin(admin: Admin): Promise<Admin>;
    FindAdminByPhone(phone: number): Promise<Admin | null>;
    FindAdminByEmail(email: string): Promise<Admin | null>;
    FindAdminById(id: string): Promise<Admin | null>;
    GetUnverifiedAdmin(phone: number): Promise<Admin | null>;
    UpdateUnverifiedAdmin(firebaseCode: string, phone: number): Promise<Admin | null>;
    GoogleOAuth(admin: Admin): Promise<Admin | null>;
    UpdateAdminData(admin: Admin, id: string): Promise<Admin | null>;
    CreatePropertyData(propertyData: PropertyData): Promise<PropertyData | null>;
    FindAdminsPropertDatas(id: string): Promise<PropertyData[] | null>;
    UpdateLastMessageUnreadToZero(id: string, text: string, time: Date, unread: number): Promise<Conversation | any>;
    FindConversationById(id: string): Promise<Conversation | null>;
    FindAdminsConversationsByAdminId(adminId: string): Promise<any>;
    FindSelectedConversation(id: string): Promise<any>;
    FilterConversationList(adminId: string, page: string, limit: string, filter: string): Promise<any>;
    FindConversationListCount(adminId: string): Promise<any>;
}