import { Admin } from "../../entities/models/admin/Admin";
import { IGetAllAdminsForSuperAdminUseCase } from "../../entities/useCasesInterfaces/superAdmin/IGetAllAdminsForSuperAdminUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";



export class GetAllAdminsForSuperAdminUseCase implements IGetAllAdminsForSuperAdminUseCase{

    constructor(private isuperAdminRepository: ISuperAdminRepository){};

    async FindAllAdmins(): Promise<Admin[]> {
        return await this.isuperAdminRepository.FindAllAdmins();
    }
}