import { IAdminLoginUseCase } from "../../../entities/useCasesInterfaces/Admin/IAdminLoginUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { AdminLoginUseCase } from "../../../useCases/Admin/AdminLoginUseCase";
import { MongoAdminRepository } from "../../repositories/admin/AdminRepository";


const adminRepository = new MongoAdminRepository();
export class AdminLoginController{


    static async AdminLoginController(req: Req, res: Res){
        console.log("login ❤️❤️❤️❤️")
        
     try {
        const result = new AdminLoginUseCase(adminRepository);
        const data = await result.LoginVerifyAdmin(req.body.email, req.body.password);
        console.log(data)
        res.json(data)
     } catch (error) {
        console.log(error)
     }
    }
}