import { Message } from "../../models/common/Message";

export interface IClearAdminChatUseCase{
  ClearAdminChatMessages(conId: string): Promise<Message[]>;
}
