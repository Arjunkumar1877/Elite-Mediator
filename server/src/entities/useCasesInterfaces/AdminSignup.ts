import { Admin } from "../admin/Admin";

export interface IAdminSignUp {
    AdminSignupExecut(admin: Admin): Promise<Admin | string>;
}