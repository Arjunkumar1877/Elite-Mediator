import { Admin } from "../../../entities/admin/Admin"

export interface IAdminRepository {
    CreateAdmin(admin: Admin): Promise<Admin>;
    
}