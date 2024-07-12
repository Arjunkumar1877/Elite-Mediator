import { Admin } from "../../models/admin/Admin";

export interface IAddAdminFcmTokenUseCase{
    AddAdminFcmToken(token: string, adminId: string): Promise<Admin>;
}