import { ISuperAdminBlockAdminUseCase } from "../../entities/useCasesInterfaces/superAdmin/ISuperAdminBlockAdminUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";

export class SuperAdminBlockAdminUseCase implements ISuperAdminBlockAdminUseCase{
    constructor(private isuperadminrepository: ISuperAdminRepository){};

    async blockAnAdmin(adminId: string): Promise<boolean> {
        const data: any = await this.isuperadminrepository.FindByIdAndBlockAnAdmin(adminId);

        return data;
    }
}