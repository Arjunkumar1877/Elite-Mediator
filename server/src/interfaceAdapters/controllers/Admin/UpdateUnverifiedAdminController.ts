import { IUpdateUnverifiedUseCase } from "../../../entities/useCasesInterfaces/Admin/IUpdateUnverifiedAdminUseCase";
import { Next, Req, Res } from "../../../frameworks/types/ServerTypes";

export class UpdateUnverifiedAdminController {
  constructor(private updateverifyadminusecase: IUpdateUnverifiedUseCase) {}

  async UpdateAdminVerifyController(req: Req, res: Res, next: Next) {
    try {
      const data = await this.updateverifyadminusecase.UpdateUnverifiedAdmin(
        req.body.firebaseCode,
        req.body.phone
      );
      res.status(200).json(data);
    } catch (error) {
      next();
      console.log(error);
    }
  }
}
