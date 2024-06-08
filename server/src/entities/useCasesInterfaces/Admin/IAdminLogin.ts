import { Admin } from "../../models/admin/Admin";

export interface IAdminLogin{
    LoginVerifyAdmin(email: string, password: string): Promise<Admin | string | null>;
}