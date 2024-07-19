import { IGetAdminAllPropertyDataUseCase } from "../../entities/useCasesInterfaces/Admin/IGetAdminAllPropertyDataUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";



export class GetAdminAllPropertDataUseCase implements IGetAdminAllPropertyDataUseCase{

    constructor(private iadminRepository: IAdminRepository){};

    async GetAdminsPropertyDatas(id: string): Promise<any> {
     return   this.iadminRepository.FindAdminsPropertDatas(id);
    }
}