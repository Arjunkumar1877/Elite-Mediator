import { IGoogleAuth } from "../../../entities/useCasesInterfaces/admin/IGoogleAuthUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GoogleOAthController {
  constructor(private googleauthusecase: IGoogleAuth) {}
  async GoogleoauthController(req: Req, res: Res) {
    try {
      // console.log(req.body);
      const data = await this.googleauthusecase.GoogleAuthLogin(req.body);
      console.log(data);
      console.log(req.body.token);
      const token: string = req.body.token;
      res.cookie("access_token", token, { httpOnly: true }).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
