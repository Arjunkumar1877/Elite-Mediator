import { ICreateConversationUseCase } from "../../../entities/useCasesInterfaces/user/ICreateConversationUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";




export class  CreateConversationController{
 constructor(private icreateconversationusecase: ICreateConversationUseCase){};

 async CreateConversationControl(req: Req, res: Res): Promise<void>{
   try {
    const { userId, adminId, propertyId} = req.body;

    const data = await this.icreateconversationusecase.CreateConvesationUseCase(userId, adminId, propertyId);

    res.json(data);

   } catch (error) {
    console.log(error)
   }
 }
}