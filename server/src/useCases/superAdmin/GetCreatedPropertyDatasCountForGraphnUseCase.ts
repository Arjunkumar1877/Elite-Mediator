import { IGetCreatedPropertyDatasCountForGraphnUseCase } from "../../entities/useCasesInterfaces/superAdmin/IGetCreatedPropertyDatasCountForGraphnUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";


export class  GetCreatedPropertyDatasCountForGraphnUseCase implements IGetCreatedPropertyDatasCountForGraphnUseCase{
  constructor(private isuperadminrepository: ISuperAdminRepository){};

   async GetCreatedPropertyDatasCount(): Promise<any> {
   return this.isuperadminrepository.FindAllGeneratedQrCodesCounts();    
  }
}