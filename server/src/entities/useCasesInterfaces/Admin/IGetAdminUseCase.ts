import { Admin } from "../../models/admin/Admin";

export interface IGetAdminUseCase{
    FindAdminById(id: string): Promise<Admin | null>;
    FindAdminByEmail(email: string): Promise<Admin | null>;
    FindAdminByPhone(phone: number): Promise<Admin | null>;
}