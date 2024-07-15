import { IGetAnAdminForSuperAdminUseCase } from "../../../entities/useCasesInterfaces/superAdmin/IGetAnAdminForSuperAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAnAdminForSuperAdminController{
 constructor(private igetanadminforsuperadminusecase: IGetAnAdminForSuperAdminUseCase){}

 async GetAnAdminForSuperAdminControl(req: Req, res: Res): Promise<void>{
   try {
    const adminId: string = req.params.adminId;

    const data: any = await this.igetanadminforsuperadminusecase.GetAnAdminProfileData(adminId);

    res.json(data);

   } catch (error) {
    console.log(error)
   }

 }
}