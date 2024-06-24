import { IUpdateConversationReadCountToZeroUseCase } from "../../../entities/useCasesInterfaces/Admin/IUpdateConversationReadCountToZeroUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class UpdateConversationReadToZeroController{
constructor(private iupdateconversationreadcounttozerousecase: IUpdateConversationReadCountToZeroUseCase){};

async updateConversationReadToZeroControl(req: Req, res: Res): Promise<void>{
   try {
    console.log("🤷‍♂️🔥🔥🔥 update the conversation unread count 0");
    const { id } = req.params;

    const conversation = await this.iupdateconversationreadcounttozerousecase.UpdateConversationReadCount(id);
    
    res.json(conversation);
   } catch (error) {
    console.log(error)
   }
}
}