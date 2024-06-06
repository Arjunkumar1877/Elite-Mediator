import { Res, Req } from "../../entities/types/ServerTypes"; 
import { AdminUseCase } from "../../useCases/AdminUseCase";
import { MongoAdminRepository } from "../repositories/admin/AdminRepository";


const adminRepository = new MongoAdminRepository();

export class AdminController{
    static async signUpAdmin(req: Req, res: Res): Promise<void>{
     try {
      console.log("Admin controller ✌️✌️✌️✌️")
        const SignUpUser = new AdminUseCase(adminRepository);
        const data = await SignUpUser.AdminSignupExecut(req.body);
        

        res.status(200).json(data)
     } catch (error) {
        console.log(error)
     }
    }

    static async getUnverifiedAdminController(req: Req, res: Res):Promise<void> {
      try {
         const phone = parseInt(req.params.phone);
        const unverifiedAdmin = new AdminUseCase(adminRepository);
        const data = await unverifiedAdmin.UnverifiedAdminExecute(phone);
        if(data){
         // const { password: pass, ...restData } = data;
         res.json(data);
        }else{
         res.json("error finding data")
        }
        
  
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }


    static async updateUnverifiedAdminController(req: Req, res: Res):Promise<void>{
      try {
        const updatedAdmin = new AdminUseCase(adminRepository);
        const data = await updatedAdmin.UnverifiedUserUpdate(req.body.firebaseConfirm, req.body.phone);
 
         res.json(data)
      } catch (error) {
        console.log(error)
      }
    }

    
    static async loginVerifyAdminController(req: Req, res: Res): Promise<void>{
      try {
        
      } catch (error) {
        console.log(error)
      }
    }
}