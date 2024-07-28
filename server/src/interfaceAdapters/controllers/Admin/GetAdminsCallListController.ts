import { IGetAdminCallListUseCase } from "../../../entities/useCasesInterfaces/admin/IGetAdminCallListUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAdminsCallListController{
   constructor(private igetAdmincalllistusecase: IGetAdminCallListUseCase){};

   async GetAdminsCallListControl(req: Req, res: Res): Promise<void> {
    try {
        const data: any = await this.igetAdmincalllistusecase.GetAdminsCallList(req.params.adminId, req.params.page);
        
        res.json(data);
    } catch (error) {
         console.log(error)
    }
   }
}