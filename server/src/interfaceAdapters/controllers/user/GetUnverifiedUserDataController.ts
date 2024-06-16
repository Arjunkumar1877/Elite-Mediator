import { IGetUnverifiedUserDataUseCase } from "../../../entities/useCasesInterfaces/user/IGetUnverfiedUserDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetUnverifiedUserDataController {
  constructor(private igetuserdatabyidusecase: IGetUnverifiedUserDataUseCase) {}

  async GetUnverifiedUserDataControl(req: Req, res: Res): Promise<void> {
    try {
      console.log(req.params.id);
      const data = await this.igetuserdatabyidusecase.GetUnverifiedUserData(
        req.params.id
      );
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
