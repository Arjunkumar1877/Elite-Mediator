import { Admin } from "../../entities/models/admin/Admin";
import {  IGetAdminUseCase } from "../../entities/useCasesInterfaces/admin/IGetAdminUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetAdminDataUseCase implements IGetAdminUseCase{
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
