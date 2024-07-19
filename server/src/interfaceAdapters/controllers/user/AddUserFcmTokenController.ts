import { IAddUserFcmTokenUseCase } from '../../../entities/useCasesInterfaces/user/IAddUserFcmTokenUseCase';
import { Req, Res } from '../../../frameworks/types/ServerTypes';

 export class  AddUserFcmTokenController{
    constructor(private iadduserfcmtokenusecase: IAddUserFcmTokenUseCase){}

    async AddUserFcmTokenControl(req: Req, res: Res): Promise<void>{
try {
    const data = await this.iadduserfcmtokenusecase.AddUserFcmToken(req.body.userId, req.body.token);

    res.json(data);
    
} catch (error) {
    console.log(error)
}
        
    }

}