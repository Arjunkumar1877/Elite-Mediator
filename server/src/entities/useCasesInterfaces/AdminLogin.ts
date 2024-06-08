import { Admin } from "../admin/Admin";

export interface IAdminLogin{
    LoginVerifyAdmin(email: string, password: string): Promise<Admin | string | null>;
}