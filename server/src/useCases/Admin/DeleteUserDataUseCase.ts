import { User } from "../../entities/models/user/User";
import { IDeleteUserDataUseCase } from "../../entities/useCasesInterfaces/Admin/IDeleteUserDataUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class DeleteUserDataUseCase implements IDeleteUserDataUseCase{
    constructor(private iadminrepository: IAdminRepository){};

 async DeleteUserDataAndConversation(userId: string): Promise<string> {
    try {
      const userData: User | null = await this.iadminrepository.FindUserByUserId(userId);
      const conId: any = userData?.conversationId;
      const deletedConversation = await this.iadminrepository.FindConversationByIdAndDelete(conId);
      const deleteUserData = await this.iadminrepository.FindUserByIdAndDelete(userId);

      if (deletedConversation && deleteUserData) {
        await this.iadminrepository.FindAndClearAdminChatMessages(conId);
        return 'deleted';
      } else {
        return 'failed';
      }
    } catch (error) {
      console.error("Error deleting user data and conversation", error);
      return 'failed';
    }
  }

}