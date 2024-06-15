import { IGetUserDataByPhoneUseCase } from "../../../entities/useCasesInterfaces/user/IGetUserDataByPhoneUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";



export class GetUserDataByPhoneController{
    constructor(private igetuserdatabyphone: IGetUserDataByPhoneUseCase){};

      async GetUserDataByPhone(req: Req, res: Res): Promise<void>{
      try {
        const data = await this.igetuserdatabyphone.FindUserDataByPhone(req.body.phone);
        res.json(data);
        
      } catch (error:any) {
        console.log(error.message)
      }
    }
}