import { IGetRegisteredPropertyOwnersandVisitorsForGraphUseCase } from "../../../entities/useCasesInterfaces/superAdmin/IGetRegisteredPropertyOwnersandVisitorsForGraphUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetRegisteredPropertyOwnersAndVisitorsController {
  constructor(private igetregisteredproperyownersandvisitors: IGetRegisteredPropertyOwnersandVisitorsForGraphUseCase){};

  async GetPropertyOwnersAndVisitorsControl(req: Req, res: Res): Promise<void>{
    try {
        const data: any = await this.igetregisteredproperyownersandvisitors.GetRegisteredPropertyOwnersandVisitors();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
  }
}