import { IGetSelecetedConversationUseCase } from "../../entities/useCasesInterfaces/Admin/IGetSelecetedConversationUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";


export class GetSelectedConversationUseCase implements IGetSelecetedConversationUseCase{
    constructor(private adminrepository: IAdminRepository){}
 
    async GetTheSelectedConversation(id: string): Promise<any>{
      return this.adminrepository.FindSelectedConversation(id);
    }


}