import { Admin } from "../../models/admin/Admin";

export interface IGetAllAdminsUseCase{
    FindAllAdmins(): Promise<Admin[]>;
}