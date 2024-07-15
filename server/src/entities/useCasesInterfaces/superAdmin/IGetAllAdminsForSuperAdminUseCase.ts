import { Admin } from "../../models/admin/Admin";

export interface IGetAllAdminsForSuperAdminUseCase{
    FindAllAdmins(): Promise<Admin[]>;
}