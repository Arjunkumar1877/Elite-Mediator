import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { ISendUserMessageUseCase } from "../../../entities/useCasesInterfaces/common/ISendMessageUseCase";
import { Server as SocketIOServer } from 'socket.io';

export class SendMessageController {
    constructor(private isendmessageusecase: ISendUserMessageUseCase, private io: SocketIOServer) {}

    async SendMessageControl(req: Req, res: Res): Promise<void> {
        const messageData = await this.isendmessageusecase.SendMessages(req.body);
        
        // Emit the new message event
        this.io.emit('newMessage', messageData);

        res.json(messageData);
    }
}
