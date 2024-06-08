import { Admin } from "../../entities/admin/Admin";
import { IUpdateAdminProfileUseCase } from "../../entities/useCasesInterfaces/AdminUpdateProfile";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class UpdateAdminProfileUseCase implements IUpdateAdminProfileUseCase{
    constructor(private adminRepository: IAdminRepository){};
    async UpdateAdminProfile(admin: Admin, id: string): Promise<Admin | null> {
       return this.adminRepository.UpdateAdminData(admin, id)
   }
}