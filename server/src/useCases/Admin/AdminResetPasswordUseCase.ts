import { IAdminResetPasswordUseCase } from "../../entities/useCasesInterfaces/admin/IAdminResetPasswordUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";
import bcrypt from 'bcrypt'


export class AdminResetPasswordUseCase implements IAdminResetPasswordUseCase {
constructor(private iadminrepository: IAdminRepository){};

 async ResetPassword(id: string, password: string): Promise<string | boolean> {
    
    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const updated = await this.iadminrepository.FindByIdAndUpdatePassword(id, hashpassword);
    
        return updated ? true : false;
    } catch (error) {
        console.error("Error resetting password:", error);
        return false;
    }
    
   
 }
}