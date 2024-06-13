import { PropertyData } from "../../entities/models/admin/PropertyData";
import { IGetAdminPropertyDataUseCase } from "../../entities/useCasesInterfaces/Admin/IGetAdminPropertyDataUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";



export class GetAdminPropertDataUseCase implements IGetAdminPropertyDataUseCase{

    constructor(private iadminRepository: IAdminRepository){};

    async GetAdminsPropertyDatas(id: string): Promise<any> {
     return   this.iadminRepository.FindAdminsPropertDatas(id);
    }
}