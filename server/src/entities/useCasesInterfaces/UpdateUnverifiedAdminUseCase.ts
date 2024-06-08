import { Admin } from "../admin/Admin";

export interface IUpdateUnverifiedUseCase{
    UpdateUnverifiedAdmin(firebaseCode: string, phone: number): Promise<Admin | null>;
}