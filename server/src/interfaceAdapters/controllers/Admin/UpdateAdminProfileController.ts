import { IUpdateAdminProfileUseCase } from "../../../entities/useCasesInterfaces/Admin/IAdminUpdateProfileUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class UpdateAdminProfileController {
  constructor(private updateadminprofileuecase: IUpdateAdminProfileUseCase) {}
  async UpdateAdminProfileData(req: Req, res: Res) {
    try {
      console.log("✌️✌️✌️✌️✌️✌️✌️❤️❤️🤷‍♀️🤷‍♀️");
      const id = req.params.id;
      console.log(id);
      const data = await this.updateadminprofileuecase.UpdateAdminProfile(
        req.body,
        id
      );
      res.json({ updated: true, data: data });
    } catch (error) {
      console.log(error);
    }
  }
}
