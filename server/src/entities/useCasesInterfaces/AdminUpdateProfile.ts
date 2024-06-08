import { Admin } from "../admin/Admin"
export interface IUpdateAdminProfileUseCase{
    UpdateAdminProfile(admin: Admin, id: string): Promise<Admin | null>;
}