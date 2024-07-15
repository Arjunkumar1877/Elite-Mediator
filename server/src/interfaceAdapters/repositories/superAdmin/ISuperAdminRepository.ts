import { Admin } from "../../../entities/models/admin/Admin";
import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";

export interface ISuperAdminRepository {
    FindByEmail(email: string): Promise<SuperAdmin | null>;
    FindAllAdmins(): Promise<any>;
    FindAnAdminByIdForSuperAdmin(adminId: string): Promise<Admin | null>
    FindFilteredUserForSuperAdmin(adminId: string, userType: string): Promise<any>; 
}