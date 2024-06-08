import { Admin } from "../../models/admin/Admin";

export interface IGoogleAuth{
    GoogleAuthLogin(admin: Admin): Promise<Admin | null | string | undefined>;
}