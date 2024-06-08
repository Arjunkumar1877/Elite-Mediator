import { Admin } from "../../../entities/models/admin/Admin"

export interface IAdminRepository {
    CreateAdmin(admin: Admin): Promise<Admin>;
    FindAdminByPhone(phone: number): Promise<Admin | null>;
    FindAdminByEmail(email: string): Promise<Admin | null>;
    FindAdminById(id: string): Promise<Admin | null>;
    GetUnverifiedAdmin(phone: number): Promise<Admin | null>;
    UpdateUnverifiedAdmin(firebaseCode: string, phone: number): Promise<Admin | null>;
    GoogleOAuth(admin: Admin): Promise<Admin | null>;
    UpdateAdminData(admin: Admin, id: string): Promise<Admin | null>;
}