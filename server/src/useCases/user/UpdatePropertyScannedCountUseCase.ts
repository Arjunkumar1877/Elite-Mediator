import { IUpdatePropertyScannedCountUseCase } from "../../entities/useCasesInterfaces/user/IUpdatePropertyScannedCountUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class UpdatePropertyScannedCountUseCase implements IUpdatePropertyScannedCountUseCase{
 constructor(private iuserrepository: IUserRepository){}

 async UpdateScannedCount(propId: string): Promise<string> {
     const updated: Promise<string> = this.iuserrepository.FindPropertyDataBypropIdAndAddScanCount(propId);

     return updated;
 }
}