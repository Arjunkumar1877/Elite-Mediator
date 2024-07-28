import { Admin } from "../../entities/models/admin/Admin";
import { IAddAdminFcmTokenUseCase } from "../../entities/useCasesInterfaces/admin/IAddAdminFcmTokenUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";



export class AddAdminFcmTokenUseCase implements IAddAdminFcmTokenUseCase{
    constructor(private iadminrepository: IAdminRepository){};

    async AddAdminFcmToken(token: string, adminId: string): Promise<Admin> {
        const exsisitingToken = await this.iadminrepository.FindAdminFcmToken(token, adminId);

        if(exsisitingToken){
            return  exsisitingToken;
        }else{
            const addedToken = await this.iadminrepository.FindAdminAndAddFcmToken(token, adminId);
            return addedToken;
        }
    }
}