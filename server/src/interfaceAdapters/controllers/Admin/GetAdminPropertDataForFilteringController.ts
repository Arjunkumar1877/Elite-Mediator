import { IGetAdminPropertyDataForFilterUseCase } from "../../../entities/useCasesInterfaces/admin/IGetAdminPropertyDataForFilterUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAdminPropertDataForFilteringController{
 constructor(private igetadminpropertydataforfilteringusecase: IGetAdminPropertyDataForFilterUseCase){};

 async GetAdminPropertyDataForFilteringControl(req: Req, res: Res): Promise<void>{
    try {
        console.log("propert data for filtering 📀📀💕💕🔥🔥🔥🔥🔥❤️❤️❤️❤️");
        const data: any = await this.igetadminpropertydataforfilteringusecase.GetAdminPropertDataForFiltering(req.params.adminId);

        res.json(data);
    } catch (error) {
        console.log(error)
    }
 }
}