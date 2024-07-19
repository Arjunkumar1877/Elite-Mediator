import { ISuperAdminLoginUseCase } from "../../../entities/useCasesInterfaces/superAdmin/ISuperAdminLoginUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class SuperAdminLoginController{

constructor(private isuperadminloginusecase: ISuperAdminLoginUseCase){}
 async SuperAdminLoginControl(req: Req, res: Res){
        try {
            const data = await this.isuperadminloginusecase.SuperAdminLogin(req.body.email, req.body.password);
           
            res.json(data);
        } catch (error) {
            res.status(404).json(error);
            console.log(error)
        }
    }
}