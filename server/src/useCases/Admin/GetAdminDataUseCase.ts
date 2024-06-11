import { Admin } from "../../entities/models/admin/Admin";
import { IGetAdmin } from "../../entities/useCasesInterfaces/Admin/IGetAdminUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetAdminDataUseCase implements IGetAdmin{
    constructor(private adminRepository: IAdminRepository){};

 async FindAdminById(id: string): Promise<Admin | null> {
      return this.adminRepository.FindAdminById(id);
  }

 async FindAdminByEmail(email: string): Promise<Admin | null> {
      return this.adminRepository.FindAdminByEmail(email);
  }

 async FindAdminByPhone(phone: number): Promise<Admin | null> {
      return this.adminRepository.FindAdminByPhone(phone);
  }
}
