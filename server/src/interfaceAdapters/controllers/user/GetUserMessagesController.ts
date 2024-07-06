import { IGetUserMessagesUseCase } from "../../../entities/useCasesInterfaces/user/IGetUserMessagesUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class  GetUserMessagesController{
   constructor(private igetusermessagesusecas: IGetUserMessagesUseCase){};

   async GetUserMessagesControl(req: Req, res: Res): Promise<void>{
    try {
        const data = await this.igetusermessagesusecas.GetUserMessagesUse(req.params.conId);
        res.json(data);
    } catch (error) {
        console.log(error)
    }
   }
}