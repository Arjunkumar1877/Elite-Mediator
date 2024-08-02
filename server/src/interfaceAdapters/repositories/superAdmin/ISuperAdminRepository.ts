import { Admin } from "../../../entities/models/admin/Admin";
import { Posters } from "../../../entities/models/superAdmin/Posters";
import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";

export interface ISuperAdminRepository {
    FindByEmail(email: string): Promise<SuperAdmin | null>;
    FindAllAdmins(): Promise<any>;
    FindAnAdminByIdForSuperAdmin(adminId: string): Promise<Admin | null>
    FindFilteredUserForSuperAdmin(adminId: string, userType: string): Promise<any>; 
    FindAPosterByIdAndUpdate(imageUrl: string, posterId: string): Promise<any>;
    FindAllPosters(): Promise<Posters[] | null>;
    FindByIdAndBlockAnAdmin(adminId: string): Promise<boolean>;
    FindByIdAndUnblockAnAdmin(adminId: string): Promise<boolean>;
    FindAllRegisteredAdminsAndVisitors(): Promise<any>;
    FindAllGeneratedQrCodesCounts(): Promise<any>;
}