import { Call } from "../../entities/models/common/Call";
import { IGetAdminCallListUseCase } from "../../entities/useCasesInterfaces/Admin/IGetAdminCallListUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetAdminCallListUseCase implements IGetAdminCallListUseCase{
    constructor(private adminrespository: IAdminRepository){};
    
    async GetAdminsCallList(id: string): Promise<Call[] | null> {
      const data = await this.adminrespository.FindAdminsCallListByAdminId(id);
      return data;    
    }
}