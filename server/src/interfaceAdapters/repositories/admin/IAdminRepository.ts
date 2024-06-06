import { Admin } from "../../../entities/admin/Admin"

export interface IAdminRepository {
    CreateAdmin(admin: Admin): Promise<Admin>;
    GetUnverifiedAdmin(phone: number): Promise<Admin | null>;
    UpdateUnverifiedAdmin(firebaseCode: string, phone: number): Promise<Admin | null>;
    LoginAdmin(email: string): Promise<Admin | null>;
    GoogleOAuth(admin: Admin): Promise<Admin | null>;
    UpdateAdmin(admin: Admin, id: string): Promise<Admin | null>;
}