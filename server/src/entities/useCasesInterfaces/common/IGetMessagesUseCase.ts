import { Message } from "../../models/common/Message";

export interface IGetMessageUseCase{
    GetMessages(conId: string): Promise<Message[] | null | string>;
}