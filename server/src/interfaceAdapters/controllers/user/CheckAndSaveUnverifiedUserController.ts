import { ICheckAndSaveUnverifiedUserUseCase } from "../../../entities/useCasesInterfaces/user/ICheckAndSaveUnverifiedUserUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class CheckAndSaveUnverifiedUserController{
  constructor(private ichechandsaveunverifieduser: ICheckAndSaveUnverifiedUserUseCase){};

  async CheckAndSaveUnverifiedUserControl(req: Req, res: Res): Promise<void>{
    try {
        const data: any = await this.ichechandsaveunverifieduser.CheckAndCreateUnverifiedUser(req.body);
        res.json(data);
    } catch (error) {
        console.log(error)
    }
  }
}