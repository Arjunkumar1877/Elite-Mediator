import { IGetMessageUseCase } from "../../../entities/useCasesInterfaces/common/IGetMessagesUseCase";
import { Server as SocketIOServer } from 'socket.io';
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetMessagesController{
    constructor(private igetmessagesusecase: IGetMessageUseCase){};

    async GetMessagesControl(req: Req, res: Res): Promise<void>{
        console.log("fetching messages ")
        const data = await this.igetmessagesusecase.GetMessages(req.params.convId)

        res.json(data);
    }
}