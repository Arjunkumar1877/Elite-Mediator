import { ISuperAdminUnblockAdminUseCase } from "../../../entities/useCasesInterfaces/superAdmin/ISuperAdminUnblockAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class SuperAdminUnblockAdminController{
    constructor(private isuperadminblockadminusecase: ISuperAdminUnblockAdminUseCase){};

    async SuperAdminUnblockAdminControl(req: Req, res: Res): Promise<void>{
        try {
            const data: any = await this.isuperadminblockadminusecase.UnblockAnAdmin(req.params.adminId);

            res.json({unblocked: data})
        } catch (error) {
            console.log(error)
        }
    }
}