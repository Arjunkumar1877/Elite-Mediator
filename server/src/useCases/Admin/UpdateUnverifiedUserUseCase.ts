import { Admin } from "../../entities/models/admin/Admin";
import { IUpdateUnverifiedUseCase } from "../../entities/useCasesInterfaces/Admin/IUpdateUnverifiedAdminUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class UpdateUnverifiedUseCase implements IUpdateUnverifiedUseCase {
    constructor(private adminRepository: IAdminRepository){};
    async UpdateUnverifiedAdmin(firebaseCode: string, phone: number): Promise<Admin | null> {
        return await this.adminRepository.UpdateUnverifiedAdmin(
            firebaseCode,
            phone
          );
    }
}