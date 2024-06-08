import { Admin } from "../../entities/admin/Admin";
import { IGoogleAuth } from "../../entities/useCasesInterfaces/GoogleAuth";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";



export class GoogleAuthUseCase implements IGoogleAuth{
    constructor(private adminRepository: IAdminRepository){}
    async GoogleAuthLogin(admin: Admin): Promise<string | Admin | null | undefined> {
        const getAdmin = await this.adminRepository.FindAdminByEmail(admin.email);

        if (!getAdmin) {
          const newAdmin = await this.adminRepository.GoogleOAuth(admin);
    
          return newAdmin;
        } else {
          return getAdmin;
        }
    }
}