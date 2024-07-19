import { ISuperAdminBlockAdminUseCase } from "../../../entities/useCasesInterfaces/superAdmin/ISuperAdminBlockAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";



export class SuperAdminBlockAdminController{
    constructor(private isuperadminblockadminusecase: ISuperAdminBlockAdminUseCase){};

    async SuperAdminBlockAdminControl(req: Req, res: Res): Promise<void>{
        try {
            const data:any = await this.isuperadminblockadminusecase.blockAnAdmin(req.params.adminId);

            res.json({blocked: data})
        } catch (error) {
            console.log(error)
        }
    }
}