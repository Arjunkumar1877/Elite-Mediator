import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { SuperAdminLoginUseCase } from "../../../useCases/superAdmin/SuperAdminLoginUsecase";
import { MongoSuperAdminRepository } from "../../repositories/superAdmin/SuperAdminRepository";

const superAdminRepository = new MongoSuperAdminRepository();
export class SuperAdminLoginController{
    static async SuperAdminLoginControl(req: Req, res: Res){
        try {
            const loginSuperAdmin = new SuperAdminLoginUseCase(superAdminRepository);
            const data = await loginSuperAdmin.SuperAdminLogin(req.body.email, req.body.password);
            console.log("Super admin loginController")
            res.json(data);
        } catch (error) {
            res.status(404).json(error);
            console.log(error)
        }
    }
}