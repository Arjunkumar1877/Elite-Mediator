import { Admin } from "../../models/admin/Admin";
export interface IAdminSignUp {
    AdminSignupExecut(admin: Admin): Promise<Admin | string>;
}