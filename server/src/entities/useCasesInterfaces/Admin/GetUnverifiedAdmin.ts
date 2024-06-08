import { Admin } from "../../models/admin/Admin";

export interface IGetUnverifiedAdmin{
    GetUnverifiedAdminData(phone: number): Promise<Admin | null>;
}