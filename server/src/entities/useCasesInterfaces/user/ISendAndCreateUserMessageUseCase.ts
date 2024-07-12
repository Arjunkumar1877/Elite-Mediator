import { Message } from "../../models/common/Message";

export interface ISendAndCreateUserMessageUseCase{
  SendNewMessage(message: Message): Promise<Message>;
}
