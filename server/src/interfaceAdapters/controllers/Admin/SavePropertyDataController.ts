import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { ISavePropertDataUseCase } from "../../../entities/useCasesInterfaces/Admin/ISavePropertyDataUseCase";

export class SavePropertDataController {
  constructor(private isavepropertydatausecase: ISavePropertDataUseCase) {}

  async SavePropertyDataControl(req: Req, res: Res): Promise<void> {
    const data = await this.isavepropertydatausecase.SavePropertData(req.body);

    res.json({ data });
  }
}
