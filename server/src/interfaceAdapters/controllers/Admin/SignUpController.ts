import { Request as Req, Response as Res } from 'express';
import { IAdminSignUp } from '../../../entities/useCasesInterfaces/admin/IAdminSignupUseCase';



export class AdminSignupController {

    constructor(private iadminsignupusecase: IAdminSignUp){}

  async signUpAdmin(req: Req, res: Res): Promise<void> {
        try {
            
            const data = await  this.iadminsignupusecase.AdminSignupExecut(req.body)
            console.log("Admin signup controller ✌️✌️✌️✌️");

            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
