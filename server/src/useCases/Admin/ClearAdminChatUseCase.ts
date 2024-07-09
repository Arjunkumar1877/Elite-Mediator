import { Message } from "../../entities/models/common/Message";
import { IClearAdminChatUseCase } from "../../entities/useCasesInterfaces/Admin/IClearAdminChatUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class ClearAdminChatUseCase implements IClearAdminChatUseCase{
  constructor(private iadminrepository: IAdminRepository){}

  async ClearAdminChatMessages(conId: string): Promise<Message[]> {
      return await this.iadminrepository.FindAndClearAdminChatMessages(conId)
  }

}