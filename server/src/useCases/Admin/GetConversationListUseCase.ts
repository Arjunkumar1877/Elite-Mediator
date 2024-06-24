import { IGetConversationListUseCase } from "../../entities/useCasesInterfaces/Admin/IGetConversationListUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetConversationListUseCase implements IGetConversationListUseCase{

    constructor(private iadminrepository: IAdminRepository){};

     async FilterOutAllConversationList(adminId: string, page: string, limit: string, filter: string): Promise<any> {
     return  await this.iadminrepository.FilterConversationList(adminId, page, limit, filter);
    }

    async FindConversationListCount(adminId: string): Promise<any>{
      return await this.iadminrepository.FindConversationListCount(adminId);
    }
}