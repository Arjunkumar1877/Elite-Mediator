import { Admin } from "../../models/admin/Admin";

export interface IUpdateUnverifiedUseCase{
    UpdateUnverifiedAdmin(firebaseCode: string, phone: number): Promise<Admin | null>;
}