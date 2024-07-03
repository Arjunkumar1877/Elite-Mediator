import { IGetUsersListUseCase } from "../../entities/useCasesInterfaces/Admin/IGetUsersListUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetUsersListUseCase implements IGetUsersListUseCase{
    constructor(private iadminreposity: IAdminRepository){};

     async GetTheUserList(id: string): Promise<any> {
       const data = await this.iadminreposity.FindUsersListByAdminId(id);
       return data    
    }
} 