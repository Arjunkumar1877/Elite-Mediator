import { hashSync } from "bcrypt";
import { Admin } from "../../entities/models/admin/Admin";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";
import { IAdminSignUp } from "../../entities/useCasesInterfaces/admin/IAdminSignupUseCase";

export class AdminSignupUseCase implements IAdminSignUp {
  constructor(private adminRepository: IAdminRepository) {}

  async AdminSignupExecut(admin: Admin): Promise<Admin | string> {
    const ExisitingEmail = await this.adminRepository.FindAdminByEmail(
      admin.email
    );
    const ExisitingPhone = await this.adminRepository.FindAdminByPhone(
      admin.phone
    );

    if (ExisitingPhone || ExisitingEmail) {
      return "Credentials already exist";
    } else {
      console.log("AdminUseCase");
      const hashedPassword = hashSync(admin.password, 10);
      admin.password = hashedPassword;
      const adminData = await this.adminRepository.CreateAdmin(admin);
      return adminData;
    }
  }
}
