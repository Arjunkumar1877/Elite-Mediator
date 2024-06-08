import { Admin } from "../admin/Admin";

export interface IGetAdmin{
    FindAdminById(id: string): Promise<Admin | null>;
    FindAdminByEmail(email: string): Promise<Admin | null>;
    FindAdminByPhone(phone: number): Promise<Admin | null>;
}