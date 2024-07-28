import { IDeleteAdminPropertyUseCase } from "../../entities/useCasesInterfaces/admin/IDeleteAdminPropertyUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class DeleteAdminPropertyUseCase implements IDeleteAdminPropertyUseCase{
    constructor(private iadminrepository: IAdminRepository){};

    async DeleteAdminsProperty(propId: string): Promise<boolean> {
        const deleted: any = await this.iadminrepository.FindPropertyByIdAndDelete(propId)

        if(deleted){
            return true
        }else{
            return false;
        }
    }

}