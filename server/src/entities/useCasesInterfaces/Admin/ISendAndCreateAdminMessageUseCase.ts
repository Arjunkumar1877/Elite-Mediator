import { Message } from "../../models/common/Message";

export interface ISendAndCreateAdminMessageUseCase{
  SendNeMessageByAdmin(message: Message): Promise<Message>;
}