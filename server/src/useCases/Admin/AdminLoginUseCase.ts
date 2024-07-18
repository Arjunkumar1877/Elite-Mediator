
import { IAdminLoginUseCase } from "../../entities/useCasesInterfaces/Admin/IAdminLoginUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";
import bcrypt from 'bcrypt';


export class AdminLoginUseCase implements IAdminLoginUseCase{
    constructor(private adminRepository: IAdminRepository){};
    async LoginVerifyAdmin(email: string, password: string): Promise<any> {

         const admin = await this.adminRepository.FindAdminByEmail(email);

         if (!admin) {
           return "Invalid credentials";
         }
     
         const passwordMatch = bcrypt.compareSync(password, admin.password);
     
         if (passwordMatch) {
           return admin;
         } else {
           return "Invalid credentials";
         }
    }
}