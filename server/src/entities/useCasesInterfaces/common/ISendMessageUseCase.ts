import { Message } from "../../models/common/Message";

export interface  ISendUserMessageUseCase{
   SendMessages(message: Message): Promise<Message | null>;
}

