import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { ISendUserMessageUseCase } from "../../../entities/useCasesInterfaces/common/ISendMessageUseCase";
import { Server as SocketIOServer } from 'socket.io';

export class SendMessageController {
    constructor(private isendmessageusecase: ISendUserMessageUseCase) {}

    async SendMessageControl(req: Req, res: Res): Promise<void> {
        console.log(req.body)
        const messageData = await this.isendmessageusecase.SendMessages(req.body);
        
        // Emit the new message event
        // this.io.emit('newMessage', messageData);

        res.json(messageData);
    }
}
