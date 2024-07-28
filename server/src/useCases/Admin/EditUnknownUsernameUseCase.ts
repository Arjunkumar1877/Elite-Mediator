import { User } from "../../entities/models/user/User";
import { IEditUnknownUsernameUseCase } from "../../entities/useCasesInterfaces/admin/IEditUnknownUsernameUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class EditUnknownUsernameUseCase implements IEditUnknownUsernameUseCase{
    constructor(private iadminrepository: IAdminRepository){};
    
    async EditUnknownUsername(userId: string, username: string): Promise<User> {
        return await this.iadminrepository.FindAndEditUnknownUser(userId, username);
    }
}