import { Message } from "../../models/common/Message";

export interface ISendAndCreateUserMessageUseCase{
  SendNewMessageByUser(message: Message): Promise<Message>;
}
