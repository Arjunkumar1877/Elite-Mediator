import { ISuperAdminUnblockAdminUseCase } from "../../entities/useCasesInterfaces/superAdmin/ISuperAdminUnblockAdminUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";


export class SuperAdminUnblockAdminUseCase implements ISuperAdminUnblockAdminUseCase{
 constructor(private isuperadminrepository: ISuperAdminRepository){};

 async UnblockAnAdmin(adminId: string): Promise<boolean> {
     const data: any = await this.isuperadminrepository.FindByIdAndUnblockAnAdmin(adminId);

     return data;
 }
}