import { ISuperAdminAddNewPosterUseCase } from "../../../entities/useCasesInterfaces/superAdmin/ISuperAdminAddNewPosterUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class SuperAdminAddNewPosterController{
 constructor(private isuperadminaddposterusecase: ISuperAdminAddNewPosterUseCase){};

async SuperAdminAddNewPOsterControl(req: Req, res: Res): Promise<void>{
try {
    
    const data:any = await this.isuperadminaddposterusecase.AddNewPoster(req.body.imageUrl, req.body.id);

    res.json(data)
} catch (error) {
    console.log(error)
}
}

}