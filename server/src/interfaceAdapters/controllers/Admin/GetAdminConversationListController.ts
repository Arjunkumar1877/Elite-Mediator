import { IGetConversationListUseCase } from "../../../entities/useCasesInterfaces/Admin/IGetConversationListUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAdminConversationListController{
    constructor(private igetconversationlistusecase: IGetConversationListUseCase){};

    async GetConversationListControl(req: Req, res: Res): Promise<void>{
        try {

            console.log("HAI IAM CONVRESATION LIST CONTROLLER 🤷‍♂️🤷‍♂️🤷‍♂️💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕")
            const { adminId, page = '1', limit = '10', filter = 'all' } = req.query as {
                adminId: string,
                page?: string,
                limit?: string,
                filter?: string
              };
            
            const conversations = await this.igetconversationlistusecase.FilterOutAllConversationList(adminId, page, limit, filter);
            const totalConversations  = await this.igetconversationlistusecase.FindConversationListCount(adminId);

            res.status(200).json({
                conversations,
                totalPages: Math.ceil(totalConversations / parseInt(limit)),
                currentPage: parseInt(page)
              });
        } catch (error) {
            console.log(error)
        }
    }

    
}
