import { Admin } from "../../entities/models/admin/Admin";
import { IGetAllAdminsUseCase } from "../../entities/useCasesInterfaces/superAdmin/IGetAllAdminsUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";



export class GetAllAdminsUseCase implements IGetAllAdminsUseCase{

    constructor(private superAdminRepository: ISuperAdminRepository){};

    async FindAllAdmins(): Promise<Admin[]> {
        return await this.superAdminRepository.FindAll();
    }
}