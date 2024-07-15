import { Admin } from "../../models/admin/Admin";

export interface IGetAnAdminForSuperAdminUseCase{
  GetAnAdminProfileData(adminId: string): Promise<Admin | null>;
}