import { IGetUsersListUseCase } from "../../entities/useCasesInterfaces/Admin/IGetUsersListUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetUsersListUseCase implements IGetUsersListUseCase{
    constructor(private iadminreposity: IAdminRepository){};

     async GetTheUserList(adminId: string, startDate: string, endDate: string, propertyName: string, userType: string): Promise<any> {
       const data = await this.iadminreposity.FindUsersListByAdminId(adminId, startDate, endDate, propertyName, userType);
       return data    
    }
} 