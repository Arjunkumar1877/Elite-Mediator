import { IGetAdminAllPropertyDataUseCase } from "../../../entities/useCasesInterfaces/Admin/IGetAdminAllPropertyDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetAdminAllPropertyDataController{
    constructor(private igetadminpropertydatausecase: IGetAdminAllPropertyDataUseCase){};

    async GetAdminPropertyDataControl(req: Req, res: Res): Promise<void>{
        const data = await this.igetadminpropertydatausecase.GetAdminsPropertyDatas(req.params.id);
        res.json(data);
    }
}