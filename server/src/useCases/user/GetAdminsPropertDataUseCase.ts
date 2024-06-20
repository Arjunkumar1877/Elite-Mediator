import { PropertyData } from "../../entities/models/admin/PropertyData";
import { IGetAdminsPropertDataUseCase } from "../../entities/useCasesInterfaces/user/IGetAdminsPropertyData";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class GetAdminsPropertDataUseCase implements IGetAdminsPropertDataUseCase{

    constructor(private iuserrepository: IUserRepository){};

    async GetAdminsPropertDataUseCase(propId: string, adminId: string): Promise<PropertyData | null> {
        return this.iuserrepository.FindPropertyData(propId, adminId);
    }
}