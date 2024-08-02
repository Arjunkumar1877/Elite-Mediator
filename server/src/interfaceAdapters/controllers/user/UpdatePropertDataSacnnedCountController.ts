import { IUpdatePropertyScannedCountUseCase } from "../../../entities/useCasesInterfaces/user/IUpdatePropertyScannedCountUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class UpdatePropertDataSacnnedCountController{
constructor(private iupdatepropertyscannedcountusecase: IUpdatePropertyScannedCountUseCase){};

async UpdatePropertyDataScannedCount(req: Req, res: Res): Promise<void>{
    try {
        const data: string = await this.iupdatepropertyscannedcountusecase.UpdateScannedCount(req.params.propId);

  res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}
}