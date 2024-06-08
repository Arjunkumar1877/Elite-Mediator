import { Admin } from "../admin/Admin";

export interface IGetUnverifiedAdmin{
    GetUnverifiedAdminData(phone: number): Promise<Admin | null>;
}