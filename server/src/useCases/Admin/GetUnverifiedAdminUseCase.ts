import { Admin } from "../../entities/models/admin/Admin";
import { IGetUnverifiedAdmin } from "../../entities/useCasesInterfaces/Admin/GetUnverifiedAdmin";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";


export class GetUnverifiedAdminDataUsecase implements IGetUnverifiedAdmin{
    constructor(private adminRepository: IAdminRepository){}
   async GetUnverifiedAdminData(phone: number): Promise<Admin | null> {
        const data = this.adminRepository.GetUnverifiedAdmin(phone);
        return data;
    }
}