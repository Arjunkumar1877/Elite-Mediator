import { Admin } from "../entities/admin/Admin";
import { IAdminRepository } from "../interfaceAdapters/repositories/admin/IAdminRepository";



export class AdminUseCase{
    constructor(private adminRepository: IAdminRepository){}

    async execute(admin: Admin): Promise<Admin>{
     return this.adminRepository.CreateAdmin(admin);
    }
}