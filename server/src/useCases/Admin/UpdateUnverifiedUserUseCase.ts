import { Admin } from "../../entities/admin/Admin";
import { IUpdateUnverifiedUseCase } from "../../entities/useCasesInterfaces/UpdateUnverifiedAdminUseCase";
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