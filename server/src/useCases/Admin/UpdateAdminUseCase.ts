import { Admin } from "../../entities/models/admin/Admin";
import { IUpdateAdminProfileUseCase } from "../../entities/useCasesInterfaces/admin/IAdminUpdateProfileUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class UpdateAdminProfileUseCase implements IUpdateAdminProfileUseCase{
    constructor(private adminRepository: IAdminRepository){};
    async UpdateAdminProfile(admin: Admin, id: string): Promise<Admin | null> {
       return this.adminRepository.UpdateAdminData(admin, id)
   }
}