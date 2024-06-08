import { Admin } from "../../entities/models/admin/Admin";
import { IAdminLogin } from "../../entities/useCasesInterfaces/Admin/IAdminLogin";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";
import bcrypt from 'bcrypt';


export class AdminLoginUseCase implements IAdminLogin{
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