import { IGetCreatedPropertyDatasCountForGraphnUseCase } from "../../../entities/useCasesInterfaces/superAdmin/IGetCreatedPropertyDatasCountForGraphnUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetCreatedPropertyDataCountForGraphController{
constructor(private igetcreatedpropertydatacountusecase: IGetCreatedPropertyDatasCountForGraphnUseCase){};

async GetGeneratedPropertyDataCountControl(req: Req, res: Res): Promise<void>{
    try {
        const data: any = await this.igetcreatedpropertydatacountusecase.GetCreatedPropertyDatasCount();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}
}