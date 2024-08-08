import { IAdminResetPasswordUseCase } from "../../../entities/useCasesInterfaces/admin/IAdminResetPasswordUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class AdminResetPasswordController{
constructor(private iadminresetandupdatepasswordusecase: IAdminResetPasswordUseCase){}

async ResetPasswordControl(req: Req, res: Res): Promise<void>{
    try {
        const data = await this.iadminresetandupdatepasswordusecase.ResetPassword(req.body.id, req.body.password);

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}
}
