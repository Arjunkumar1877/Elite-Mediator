import { IGetUserDataByIdUseCase } from "../../../entities/useCasesInterfaces/user/IGetUserDataByIdUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetUserDataByIdController {
  constructor(private igetuserdatabyidusecase: IGetUserDataByIdUseCase) {}

  async GetUnverifiedUserDataControl(req: Req, res: Res): Promise<void> {
    try {
      console.log("get User by id 💕💕💕💕");
      console.log(req.params.id);
      const data = await this.igetuserdatabyidusecase.GetTheUserDataById(
        req.params.id
      );
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }


}
