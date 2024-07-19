import { SuperAdmin } from "../../entities/models/superAdmin/SuperAdmin";
import { ISuperAdminLoginUseCase } from "../../entities/useCasesInterfaces/superAdmin/ISuperAdminLoginUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";




export class SuperAdminLoginUseCase implements ISuperAdminLoginUseCase{

    constructor(private superAdminRepository: ISuperAdminRepository){}

   async  SuperAdminLogin(email: string, password: string): Promise<SuperAdmin | string> {

    const emailExist: any = await this.superAdminRepository.FindByEmail(email);;
    if(emailExist && emailExist?.password === password){
        return emailExist
    }else{
        return "Invalid";
    }
    }
}