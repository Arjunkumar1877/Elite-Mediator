import { IGetRegisteredPropertyOwnersandVisitorsForGraphUseCase } from "../../entities/useCasesInterfaces/superAdmin/IGetRegisteredPropertyOwnersandVisitorsForGraphUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";



export class GetRegisteredPropertyOwnersandVisitorsForGraphUseCase implements IGetRegisteredPropertyOwnersandVisitorsForGraphUseCase{
constructor(private isuperadminrepository: ISuperAdminRepository){};

async GetRegisteredPropertyOwnersandVisitors(): Promise<any> {
    return await this.isuperadminrepository.FindAllRegisteredAdminsAndVisitors();
}

}