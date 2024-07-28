import { Message } from "../../entities/models/common/Message";
import { IGetAdminMessagesUseCase } from "../../entities/useCasesInterfaces/admin/IGetAdminMessagesUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetAdminMessagesUseCase implements IGetAdminMessagesUseCase {
  constructor(private iadminrepository: IAdminRepository) {}
  async GetAdminAllMesages(conId: string): Promise<Message[] | null | string> {
    const conversation: any = await this.iadminrepository.FindConversationById(
      conId
    );

    if (conversation) {
      const message: any = await this.iadminrepository.FindAllAdminMessages(
        conId
      );
      return message;
    } else {
      return "No conversation Id or conversation exsists";
    }
  }
}
