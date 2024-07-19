import { Message } from "../../models/common/Message";

export interface  IGetAdminMessagesUseCase{
 GetAdminAllMesages(conId: string): Promise<Message[] | null | string>;
}