import { IGetAllAdminsForSuperAdminUseCase } from "../../../entities/useCasesInterfaces/superAdmin/IGetAllAdminsForSuperAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAllAdminsForSuperAdminController {
constructor(private igetalladminsforsuperadminusecase: IGetAllAdminsForSuperAdminUseCase){};


    async GetAllAdminForSuperAdminContol(req: Req, res: Res): Promise<void>{
    try {
        const data = await this.igetalladminsforsuperadminusecase.FindAllAdmins();

        res.json(data)
    } catch (error) {
        console.log(error)
    }
     
    }
}