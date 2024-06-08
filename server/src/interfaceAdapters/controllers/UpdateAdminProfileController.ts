import { Req, Res } from "../../frameworks/types/ServerTypes";
import { UpdateAdminProfileUseCase } from "../../useCases/Admin/UpdateAdminUseCase";
import { MongoAdminRepository } from "../repositories/admin/AdminRepository";


const adminRepository = new MongoAdminRepository();


export class UpdateAdminProfileController{
    static async UpdateAdminProfileData(req: Req, res: Res){

        try {
            console.log("✌️✌️✌️✌️✌️✌️✌️❤️❤️🤷‍♀️🤷‍♀️");
      
            const id = req.params.id;
            console.log(id)
      
            const result = new  UpdateAdminProfileUseCase(adminRepository);
            const data = await result.UpdateAdminProfile(req.body, id);
      
            res.json({ updated: true, data: data });
          } catch (error) {
            console.log(error);
          }
    }
}