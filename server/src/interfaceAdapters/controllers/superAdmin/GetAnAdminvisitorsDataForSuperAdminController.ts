import { IGetAnAdminsVisitorsForSuperAdminUseCase } from "../../../entities/useCasesInterfaces/superAdmin/IGetAnAdminsVisitorsForSuperAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";



export class GetAnAdminvisitorsDataForSuperAdminController{
    constructor(private igetanadminvisitorsforsuperadminusecase: IGetAnAdminsVisitorsForSuperAdminUseCase){};

    async GetAnAdminsVisitorsConrol(req: Req, res: Res): Promise<void>{
      try {

        console.log("super admin 📀📀📀💕💕🔥🔥🔥🔥🔥🔥🔥🔥")
        // console.log(req.body)
        const data: any = await this.igetanadminvisitorsforsuperadminusecase.GetVisitorsOfanAdmin(req.body.adminId, req.body.userType);
    
        res.status(200).json(data)
      } catch (error) {
        console.log(error)
      }
    }

}