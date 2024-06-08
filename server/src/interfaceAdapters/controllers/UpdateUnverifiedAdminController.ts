import { Next, Req, Res } from "../../frameworks/types/ServerTypes";
import { UpdateUnverifiedUseCase } from "../../useCases/Admin/UpdateUnverifiedUserUseCase";
import { MongoAdminRepository } from "../repositories/admin/AdminRepository";

const adminRepository = new MongoAdminRepository();
export class UpdateUnverifiedAdminController{
    static async UpdateAdminVerifyController(req: Req, res: Res, next: Next){
      try {
        const result = new UpdateUnverifiedUseCase(adminRepository);
        const data = await result.UpdateUnverifiedAdmin(req.body.firebaseCode, req.body.phone);
        res.status(200).json(data)
        
      } catch (error) {
        next()
        console.log(error)
      }    
    }

}