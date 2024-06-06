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
        console.log("👍👍👍👍😣😣🤷‍♀️🤷‍♀️🤷‍♀️ ")
        const updatedAdmin = new AdminUseCase(adminRepository);
        const data = await updatedAdmin.UnverifiedUserUpdate(req.body.firebaseConfirm, req.body.phone);
 
         res.json(data)
      } catch (error) {
        console.log(error)
      }
    }

    
    static async loginVerifyAdminController(req: Req, res: Res): Promise<void>{
      try {
        console.log("😣😣✌️✌️✌️🤷‍♂️🤷‍♂️")
      const loggedIn = new AdminUseCase(adminRepository);
      const data = await  loggedIn.LoginVerifyAdmin(req.body.email, req.body.password);

      if(data){
        res.json({loggedIn: true, data: data})
      }else{
        res.json({loggedIn: false})
      }
   
      } catch (error) {
        console.log(error)
      }
    }

    static async GoogleLoginController(req: Req, res: Res): Promise<void>{
      try {
        console.log('😂😂😣❤️')
        const googleVerify = new AdminUseCase(adminRepository);
        const data = await googleVerify.GoogleLogin(req.body);
        console.log(data)
        console.log(req.body)
        res.json(data)
      } catch (error) {
        console.log(error)
      }
    }

    static async UpdateAdminProfile(req: Req, res: Res): Promise<void>{
      try {
        console.log("✌️✌️✌️✌️✌️✌️✌️❤️❤️🤷‍♀️🤷‍♀️")

        const id = req.params.id;
        const updatedAdmin = new AdminUseCase(adminRepository);
        console.log(req.body)
        const data = await updatedAdmin.UpdatedAdmin(req.body, id);
        
        res.json({updated: true, data:data});
        
      } catch (error) {
        console.log(error)
      }
    }
}