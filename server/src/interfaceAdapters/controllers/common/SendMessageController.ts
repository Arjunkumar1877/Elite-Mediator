import { ISendUserMessageUseCase } from "../../../entities/useCasesInterfaces/common/ISendMessageUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class SendMessageController{
    constructor(private isendmessageusecase: ISendUserMessageUseCase){}
 
    async SendMessageControl(req: Req, res: Res): Promise<void>{
         const messageData = await this.isendmessageusecase.SendMessages(req.body);

         res.json(messageData);
    }
}