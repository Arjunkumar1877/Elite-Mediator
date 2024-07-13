import { IUserStatisticsGraphDataUseCase } from "../../../entities/useCasesInterfaces/Admin/IUserStatisticsGraphDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetUserStatisticsGraphDataController{
  constructor(private iuserstatisticsgraphdatausecase: IUserStatisticsGraphDataUseCase){};

  async GetUserStatisticsGraphDataControl(req: Req, res: Res): Promise<void>{
   try {
    const data = await this.iuserstatisticsgraphdatausecase.GetUserStatisticGraphData(req.params.adminId);
    console.log(data);

    res.status(200).json(data)
   } catch (error) {
    console.log(error)
   }
  }
}