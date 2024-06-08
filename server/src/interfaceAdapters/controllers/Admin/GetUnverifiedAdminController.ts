import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { GetUnverifiedAdminDataUsecase } from "../../../useCases/Admin/GetUnverifiedAdminUseCase";
import { MongoAdminRepository } from "../../repositories/admin/AdminRepository";

const adminrepository = new MongoAdminRepository();
export class GetUnVerifiedAdminController{
 
  static async getUnverifiedAdminController(req: Req, res: Res): Promise<void> {
    try {
      const phone = parseInt(req.params.phone);
      const result = new GetUnverifiedAdminDataUsecase(adminrepository);
     const data = await  result.GetUnverifiedAdminData(phone)
      if (data) {
        // const { password: pass, ...restData } = data;
        res.json(data);
      } else {
        res.json("error finding data");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}