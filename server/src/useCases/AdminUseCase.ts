import { hashSync } from "bcrypt";
import { Admin } from "../entities/admin/Admin";
import { IAdminRepository } from "../interfaceAdapters/repositories/admin/IAdminRepository";
import bcrypt from 'bcrypt';

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

    async LoginVerifyAdmin(email: string, password: string): Promise<Admin | null | string> {
      const admin = await this.adminRepository.LoginAdmin(email);
    
      if (!admin) {
        return "Invalid credentials"; // No admin found with the given email
      }
    
      const passwordMatch = bcrypt.compareSync(password, admin.password); // Using compareSync instead of compare
    
      if (passwordMatch) {
        return admin; // Password matches, return the admin object
      } else {
        return "Invalid credentials"; // Password does not match
      }
    }

    async GoogleLogin(admin: Admin): Promise<Admin | null | string | undefined> {
        const getUser = await this.adminRepository.LoginAdmin(admin.email); 
      
        if (!getUser) {
        const newUser = await this.adminRepository.GoogleOAuth(admin);
          
          return newUser;
        } else {
        //   if(getUser?.verified){
            return getUser;
        //   }
        }
    }
    
    async UpdatedAdmin(admin: Admin, id: string): Promise<Admin | null>{
      return this.adminRepository.UpdateAdmin(admin, id);
    }
    
}
