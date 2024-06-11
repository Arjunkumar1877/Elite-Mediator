import { IAdminLoginUseCase } from "../../../entities/useCasesInterfaces/Admin/IAdminLoginUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class AdminLoginController {
  constructor(private iadminloginusecase: IAdminLoginUseCase) {}

  async login(req: Req, res: Res) {
    console.log("login ❤️❤️❤️❤️")
    try {
      const data = await this.iadminloginusecase.LoginVerifyAdmin(req.body.email, req.body.password);
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}
