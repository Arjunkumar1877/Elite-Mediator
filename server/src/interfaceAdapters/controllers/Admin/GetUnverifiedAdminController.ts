import { IGetUnverifiedAdmin } from "../../../entities/useCasesInterfaces/admin/IGetUnverifiedAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetUnverifiedAdminController {
  constructor(private getunverifiedadminusecase: IGetUnverifiedAdmin) {}

  async getUnverifiedAdminController(req: Req, res: Res): Promise<void> {
    try {
      const phone: number = parseInt(req.params.phone);
      const data: any = await this.getunverifiedadminusecase.GetUnverifiedAdminData(
        phone
      );
      if (data) {
        res.json(data);
      } else {
        res.json("error finding data");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
