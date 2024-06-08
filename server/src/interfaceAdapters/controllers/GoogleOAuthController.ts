import { Req, Res } from "../../frameworks/types/ServerTypes";
import { GoogleAuthUseCase } from "../../useCases/Admin/GoogleAuthUseCase";
import { MongoAdminRepository } from "../repositories/admin/AdminRepository";

const adminRepository = new MongoAdminRepository();
export class GoogleAthController{
static async GoogleAuthController(req: Req, res: Res){
    try {
        console.log("😂😂😣❤️");
       const googleVerify = new GoogleAuthUseCase(adminRepository)
        const data = await googleVerify.GoogleAuthLogin(req.body)
        console.log(data);
        console.log(req.body);
        res.json(data);
      } catch (error) {
        console.log(error);
      }
}
}