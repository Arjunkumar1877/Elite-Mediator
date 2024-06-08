import { Admin } from "../admin/Admin";

export interface IGoogleAuth{
    GoogleAuthLogin(admin: Admin): Promise<Admin | null | string | undefined>;
}