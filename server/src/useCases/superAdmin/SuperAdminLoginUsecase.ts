import { SuperAdmin } from "../../entities/models/superAdmin/SuperAdmin";
import { ISuperAdminLogin } from "../../entities/useCasesInterfaces/superAdmin/ISuperAdminLoginUseCase";
import { AdminLoginController } from "../../interfaceAdapters/controllers/Admin/AdminLoginController";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";
import { AdminLoginUseCase } from "../Admin/AdminLoginUseCase";




export class SuperAdminLoginUseCase implements ISuperAdminLogin{

    constructor(private superAdminRepository: ISuperAdminRepository){}

   async  SuperAdminLogin(email: string, password: string): Promise<SuperAdmin | string> {

    const emailExist = await this.superAdminRepository.FindByEmail(email);;
    if(emailExist && emailExist?.password === password){
        return emailExist
    }else{
        return "Invalid credentials";
    }
    }
}