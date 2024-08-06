import { IGetAdminDataByEmailUseCase } from "../../../entities/useCasesInterfaces/admin/IGetAdminDataByEmailUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAdminDataByEmailController {
  constructor(
    private igetadmindatabyemailusecase: IGetAdminDataByEmailUseCase
  ) {}

  async GetAdminDataControl(req: Req, res: Res): Promise<void> {
    try {
      const data = await this.igetadmindatabyemailusecase.GetAdminDataByEmail(
        req.params.email
      );

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
