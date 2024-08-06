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

    if (ExisitingEmail) {
      return "Email already exists";
    }

    if (ExisitingPhone) {
      return "Phone number already exists";
    }

    try {
      console.log("AdminUseCase");
      const hashedPassword = hashSync(admin.password, 10);
      admin.password = hashedPassword;
      const adminData = await this.adminRepository.CreateAdmin(admin);
      return adminData;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handling the duplicate key error
        if (error.keyPattern.email) {
          return "Email already exists";
        }
        if (error.keyPattern.phone) {
          return "Phone number already exists";
        }
      }
      throw error; // rethrow if it's some other error
    }
  }
}
