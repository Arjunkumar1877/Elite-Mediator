import { IVerifyUserUseCase } from "../../../entities/useCasesInterfaces/user/IVerifyUserUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";



export class VerifyAndUpdateUserController{
    constructor(private iverifyandupdateuserusecase: IVerifyUserUseCase){};

    async VerifyAndUpdateUserControl(req: Req, res: Res): Promise<void>{
       try {
        console.log("⛔⛔💹💹💹💹💹💹")
        const data = await this.iverifyandupdateuserusecase.FindUserAndUpdate(req.params.id);

        res.json(data);
       } catch (error) {
       console.log(error)
       }
    }
}