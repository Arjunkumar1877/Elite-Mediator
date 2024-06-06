import { hashSync } from "bcrypt";
import { Admin } from "../entities/admin/Admin";
import { IAdminRepository } from "../interfaceAdapters/repositories/admin/IAdminRepository";

export class AdminUseCase {
    constructor(private adminRepository: IAdminRepository) {}

    async AdminSignupExecut(admin: Admin): Promise<Admin> {
        console.log("AdminUseCase");
        const hashedPassword = hashSync(admin.password, 10); 
        admin.password = hashedPassword;
        const adminData = await this.adminRepository.CreateAdmin(admin);
        return adminData;
    }

    async UnverifiedAdminExecute(phone: number): Promise<Admin | null>{
        return await this.adminRepository.GetUnverifiedAdmin(phone);
    }

    async UnverifiedUserUpdate(firebaseCode: string, phone: number): Promise<Admin | null>{
        return await this.adminRepository.UpdateUnverifiedAdmin(firebaseCode, phone);
    }

    async LoginVerifyAdmin(email: string, password: string): Promise<Admin | null | string>{
        const admin = await this.adminRepository.LoginAdmin(email);

        if(admin && admin.password === password){
          return admin
        }else{
            return "Invalid credentials";
        }
    }
}
