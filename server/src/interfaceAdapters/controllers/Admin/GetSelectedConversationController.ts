import { IGetSelecetedConversationUseCase } from "../../../entities/useCasesInterfaces/admin/IGetSelecetedConversationUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetSelectedConversationController{
    constructor(private igetselectedconversationusecase: IGetSelecetedConversationUseCase){};

async GetSelectedConversationControl(req: Req, res: Res): Promise<void>{
    const { id } = req.params;
    const data: any = await this.igetselectedconversationusecase.GetTheSelectedConversation(id);
    console.log("get selected conversatio controller 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥💕💕😣😣");
    res.json(data)
}


}