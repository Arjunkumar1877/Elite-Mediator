import { ICreateConversationUseCase } from "../../../entities/useCasesInterfaces/user/ICreateConversationUseCase";
import { IGetUserDataByIdUseCase } from "../../../entities/useCasesInterfaces/user/IGetUserDataByIdUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";




export class  CreateConversationController{
 constructor(private icreateconversationusecase: ICreateConversationUseCase, private igetuserdatabyid: IGetUserDataByIdUseCase){};

 async CreateConversationControl(req: Req, res: Res): Promise<void>{
   try {
    const { userId, adminId, propertyId} = req.body;

    const conversationData = await this.icreateconversationusecase.CreateConvesationUseCase(userId, adminId, propertyId);
    const userData = await this.igetuserdatabyid.GetTheUserDataById(userId)
    // const userData = await 

    res.json({conversation: conversationData, user: userData});

   } catch (error) {
    console.log(error)
   }
 }
}