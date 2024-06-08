import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { GoogleAuthUseCase } from "../../../useCases/Admin/GoogleAuthUseCase";
import { MongoAdminRepository } from "../../repositories/admin/AdminRepository";

const adminRepository = new MongoAdminRepository();
export class GoogleAthController{
static async GoogleAuthController(req: Req, res: Res){
    try {
        console.log("😂😂😣❤️");
        console.log(req.body)
       const googleVerify = new GoogleAuthUseCase(adminRepository)
        const data = await googleVerify.GoogleAuthLogin(req.body)
        console.log(data);
        console.log(req.body.token);
        const token:string = req.body.token 
        res.cookie('access_token', token, {httpOnly: true}).json(data);
      } catch (error) {
        console.log(error);
      }
}
}