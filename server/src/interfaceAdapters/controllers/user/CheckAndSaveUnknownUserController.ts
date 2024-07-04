import { ICheckAndSaveUnknownUserUseCase } from "../../../entities/useCasesInterfaces/user/ICheckAndSaveUnknownUserUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class  CheckAndSaveUnknownUserController{
  constructor(private icheckandsaveunknownuserusecase: ICheckAndSaveUnknownUserUseCase){};

  async CheckAndSaveUnknownUserControl(req: Req, res: Res): Promise<void>{
    try {
      // console.log(req.body);

      console.log("💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕")
      const data = await this.icheckandsaveunknownuserusecase.CheckAndSaveTheUnknownUser(req.body);
      res.json(data);
    } catch (error) {
      console.log(error)
    }
  }
}