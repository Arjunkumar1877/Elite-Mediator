import { Call } from "../../entities/models/common/Call";
import { IGetAdminCallListUseCase } from "../../entities/useCasesInterfaces/Admin/IGetAdminCallListUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetAdminCallListUseCase implements IGetAdminCallListUseCase{
    constructor(private adminrespository: IAdminRepository){};
    
    async GetAdminsCallList(id: string, page: number): Promise<Call[] | any> {
      const calls = await this.adminrespository.FindAdminsCallListByAdminId(id, page);
      const totalCalls = await this.adminrespository.FindTotalCountOftheCallList(id);
      return {calls, totalCalls};    
    }
}