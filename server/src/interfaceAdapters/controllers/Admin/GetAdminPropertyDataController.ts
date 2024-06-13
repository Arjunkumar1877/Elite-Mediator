import { IGetAdminPropertyDataUseCase } from "../../../entities/useCasesInterfaces/Admin/IGetAdminPropertyDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetAdminPropertyDataController{
    constructor(private igetadminpropertydatausecase: IGetAdminPropertyDataUseCase){};

    async GetAdminPropertyDataControl(req: Req, res: Res): Promise<void>{
        const data = await this.igetadminpropertydatausecase.GetAdminsPropertyDatas(req.params.id);
        res.json(data);
    }
}