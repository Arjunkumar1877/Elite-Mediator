import { IGetConversationListUseCase } from "../../../entities/useCasesInterfaces/Admin/IGetConversationListUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAdminConversationListController{
    constructor(private igetconversationlistusecase: IGetConversationListUseCase){};

    async GetConversationListControl(req: Req, res: Res): Promise<void>{
        try {

            const { adminId, page = 1, propertyFilter, startDate, endDate }: any = req.query;
         let limit: number = 10;
            console.log("HAI IAM CONVRESATION LIST CONTROLLER 🤷‍♂️🤷‍♂️🤷‍♂️💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕")
       
            const conversations = await this.igetconversationlistusecase.FilterOutAllConversationList(adminId, page, propertyFilter, startDate, endDate);
            const totalConversations  = await this.igetconversationlistusecase.FindConversationListCount(adminId);
            const totalPages = Math.ceil(totalConversations / limit);
            console.log(totalPages + "🔥🔥🔥 total docs");
            console.log(totalConversations + "🔥🔥🔥 total con");
            
      res.json({ conversations, totalPages });
        } catch (error) {
            console.log(error)
        }
    }

    
}
