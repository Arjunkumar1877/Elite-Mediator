import { User } from "../../entities/models/user/User";
import { IGetAnAdminsVisitorsForSuperAdminUseCase } from "../../entities/useCasesInterfaces/superAdmin/IGetAnAdminsVisitorsForSuperAdminUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";


export class GetAnAdminsVisitorsForSuperAdminUseCase implements IGetAnAdminsVisitorsForSuperAdminUseCase{
    constructor(private isuperadminrepository: ISuperAdminRepository){};

    async GetVisitorsOfanAdmin(adminId: string, userType: string): Promise<User[] | null> {
        const data:any = await this.isuperadminrepository.FindFilteredUserForSuperAdmin(adminId, userType);
        // console.log(data)
        return data;
    }
}