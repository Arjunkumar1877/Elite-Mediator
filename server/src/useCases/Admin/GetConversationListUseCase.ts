import { IGetConversationListUseCase } from "../../entities/useCasesInterfaces/Admin/IGetConversationListUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetConversationListUseCase implements IGetConversationListUseCase{

    constructor(private iadminrepository: IAdminRepository){};

     async FilterOutAllConversationList(adminId: string, page: number, propertyFilter: string, startDate: any, endDate: any): Promise<any> {
     return  await this.iadminrepository.FilterConversationList(adminId, page, propertyFilter, startDate, endDate);
    }

    async FindConversationListCount(adminId: string): Promise<any>{
      return await this.iadminrepository.FindConversationListCount(adminId);
    }
}