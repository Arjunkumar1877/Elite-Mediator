import { Res, Req } from "../../frameworks/server/types/ServerTypes";
import { AdminUseCase } from "../../useCases/AdminUseCase";
import { MongoAdminRepository } from "../repositories/admin/AdminRepository";


const adminRepository = new MongoAdminRepository();

export class AdminController{
    static async signUpAdmin(req: Req, res: Res): Promise<void>{
     try {
        const SignUpUser = new AdminUseCase(adminRepository);
        const data = await SignUpUser.execute(req.body);

        res.status(200).json(data)
     } catch (error) {
        console.log(error)
     }
    }
}