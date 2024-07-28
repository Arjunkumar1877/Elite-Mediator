import { Message } from "../../entities/models/common/Message";
import { ISendAndCreateAdminMessageUseCase } from "../../entities/useCasesInterfaces/admin/ISendAndCreateAdminMessageUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class  SendAndCreateAdminMessageUseCase implements ISendAndCreateAdminMessageUseCase{
constructor(private iadminrepository:  IAdminRepository){};

async SendNeMessageByAdmin(message: Message): Promise<Message> {
    const savedData = await this.iadminrepository.CreateAdminNewMessageToDb(message);

    return savedData;
}
}
