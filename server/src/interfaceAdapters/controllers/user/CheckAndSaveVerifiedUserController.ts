import { ICheckAndsaveVerifiedUseUseCase } from "../../../entities/useCasesInterfaces/user/ICheckAndsaveVerifiedUseUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class CheckAndSaveVerifiedUserController{
 constructor(private icheckandsavecerifieduserusecase: ICheckAndsaveVerifiedUseUseCase){};

 async CheckAndSaveVerifiedUserControl(req: Req, res: Res): Promise<void>{
    try {
        const data: any = await this.icheckandsavecerifieduserusecase.CheckAndSaveVerifiedUser(req.body);
        console.log("creating verified user s 💕💕💕💕💕");
        console.log(data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
 }
}