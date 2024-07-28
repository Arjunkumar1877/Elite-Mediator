import { IUpdateConversationReadCountToZeroUseCase } from "../../entities/useCasesInterfaces/admin/IUpdateConversationReadCountToZeroUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class UpdateConversationReadCountToZeroUseCase implements IUpdateConversationReadCountToZeroUseCase {
    constructor(private iadminrepository: IAdminRepository) { }

    async UpdateConversationReadCount(id: string): Promise<any> {
        const con = await this.iadminrepository.FindConversationById(id);
        
        if (con?.lastMessage?.text && con?.lastMessage?.time) {
            // Ensure the time is of type Date
            const time: any = typeof con.lastMessage.time === 'string' ? new Date(con.lastMessage.time) : con.lastMessage.time;
            
            const update: any = await this.iadminrepository.UpdateLastMessageUnreadToZero(id, con.lastMessage.text, time, 0);
            
            if (update) {

              console.log(update)
                const conversations: any = await this.iadminrepository.FindAdminsConversationsByAdminId(update.adminId);
                return conversations;
            } else {
                // Handle the case where the update fails
                throw new Error('Failed to update the last message unread count to zero.');
            }
        } else {
            // Handle the case where lastMessage or its properties are undefined
           console.log('Conversation last message is missing text or time.');
        }
    }
}
