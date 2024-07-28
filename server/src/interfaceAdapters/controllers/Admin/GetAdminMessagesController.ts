import { IGetAdminMessagesUseCase } from '../../../entities/useCasesInterfaces/admin/IGetAdminMessagesUseCase';
import { Req, Res } from '../../../frameworks/types/ServerTypes';

export class GetAdminMessagesController{
 constructor(private igetadminmessageusecase: IGetAdminMessagesUseCase){}

 async GetAdminMessagescontrol(req: Req, res: Res): Promise<void>{
   try {
    const data: any = await this.igetadminmessageusecase.GetAdminAllMesages(req.params.conId)

    res.json(data)
   } catch (error) {
    console.log(error)
   }
 }
}