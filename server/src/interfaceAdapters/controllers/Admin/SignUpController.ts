import { Request as Req, Response as Res } from 'express';
import { MongoAdminRepository } from '../../repositories/admin/AdminRepository'; 
import { AdminUseSignupUseCase } from '../../../useCases/Admin/AdminSignUseCase';
import { IAdminSignUp } from '../../../entities/useCasesInterfaces/Admin/IAdminSignupUseCase';


const adminRepository = new MongoAdminRepository()

export class SignupController {

    constructor(private adminRepo: IAdminSignUp){}

  static  async signUpAdmin(req: Req, res: Res): Promise<void> {
        try {
            const admin = req.body; 
            
            const result = new AdminUseSignupUseCase(adminRepository);
            const data = await result.AdminSignupExecut(req.body);
            console.log("Admin controller ✌️✌️✌️✌️");

            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
