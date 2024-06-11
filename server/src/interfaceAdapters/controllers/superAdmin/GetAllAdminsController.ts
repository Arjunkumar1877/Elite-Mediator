import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { GetAllAdminsUseCase } from "../../../useCases/superAdmin/GetAllAdminUseCase";
import { MongoSuperAdminRepository } from "../../repositories/superAdmin/SuperAdminRepository";

const supeAdminRepository = new MongoSuperAdminRepository(); 
export class GetAllAdminsController {
    static async GetAllAdminContol(req: Req, res: Res): Promise<void>{
      try {
        const getAllAdminData = new GetAllAdminsUseCase(supeAdminRepository);
        const data = await getAllAdminData.FindAllAdmins();
        res.json(data);
      } catch (error) {
        console.log(error)
      }
     
    }
}