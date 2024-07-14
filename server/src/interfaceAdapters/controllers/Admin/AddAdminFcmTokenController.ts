import { IAddAdminFcmTokenUseCase } from "../../../entities/useCasesInterfaces/Admin/IAddAdminFcmTokenUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class  AddAdminFcmTokenController{
    constructor(private iaddAdminfcmtokenusecase: IAddAdminFcmTokenUseCase){};

    async AddAdminFcmTokenControl(req: Req, res: Res): Promise<void> {
        try {
            const data = await this.iaddAdminfcmtokenusecase.AddAdminFcmToken(req.body.token, req.body.adminId);

            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }
}