import { Admin } from "../../models/admin/Admin";

export interface IAdminLoginUseCase{
    LoginVerifyAdmin(email: string, password: string): Promise<Admin | string | null>;
}