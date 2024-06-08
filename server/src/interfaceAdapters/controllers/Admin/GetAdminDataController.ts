import { Req, Res } from "../../../frameworks/types/ServerTypes";
import { GetAdminDataUseCase } from "../../../useCases/Admin/GetAdminDataUseCase";
import { MongoAdminRepository } from "../../repositories/admin/AdminRepository";

const adminRepository = new MongoAdminRepository();
export class GetAdminController {

    static async GetAdminDataByIdController(req: Req, res: Res): Promise<void> {
        try {

          console.log(req.body)
          const fromUseCase = new GetAdminDataUseCase(adminRepository);
          const data = await fromUseCase.FindAdminById(req.params.id);
          res.json(data);
        } catch (error) {
          console.log(error)
        }
      }
}