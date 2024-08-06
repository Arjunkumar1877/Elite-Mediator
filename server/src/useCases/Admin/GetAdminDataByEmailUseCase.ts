import { IGetAdminDataByEmailUseCase } from "../../entities/useCasesInterfaces/admin/IGetAdminDataByEmailUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class  GetAdminDataByEmailUseCase implements IGetAdminDataByEmailUseCase{
 constructor(private iadminrepository: IAdminRepository){};

 async GetAdminDataByEmail(email: string): Promise<any> {
     return await this.iadminrepository.FindAdminByEmail(email);
 }
 

}