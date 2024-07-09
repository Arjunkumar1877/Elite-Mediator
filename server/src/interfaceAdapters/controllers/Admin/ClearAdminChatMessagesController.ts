import { IClearAdminChatUseCase } from "../../../entities/useCasesInterfaces/Admin/IClearAdminChatUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class ClearAdminChatMessagesController{
  constructor(private iclearadminchatmessages: IClearAdminChatUseCase){}

  async clearAllAdminMessagesControl(req: Req, res: Res): Promise<void>{
    try {
        const { conId } = req.params;
        const result = await this.iclearadminchatmessages.ClearAdminChatMessages(conId)
        res.status(200).json({
            success: true,
            message: `Messages with conversation ID ${conId} have been marked as deleted.`,
            result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating messages.',
            error: error.message
        });
    }
  }
}