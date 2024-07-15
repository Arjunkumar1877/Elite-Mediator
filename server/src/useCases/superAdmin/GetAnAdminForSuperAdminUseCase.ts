import { Admin } from "../../entities/models/admin/Admin";
import { IGetAnAdminForSuperAdminUseCase } from "../../entities/useCasesInterfaces/superAdmin/IGetAnAdminForSuperAdminUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";

export class GetAnAdminForSuperAdminUseCase implements IGetAnAdminForSuperAdminUseCase{
    constructor(private isuperadminrepository: ISuperAdminRepository){};

    async GetAnAdminProfileData(adminId: string): Promise<Admin | null> {
        const data = await this.isuperadminrepository.FindAnAdminByIdForSuperAdmin(adminId);

        return data;
    }
}