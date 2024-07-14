import { IDeleteUserDataUseCase } from "../../../entities/useCasesInterfaces/Admin/IDeleteUserDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class  DeleteUserDataAndConversationController {
    constructor(private ideleteuserdatausecase: IDeleteUserDataUseCase){};

    async DeleteUserDataConversatiionControl(req: Req, res: Res): Promise<void>{
      try {
        const data = await this.ideleteuserdatausecase.DeleteUserDataAndConversation(req.params.userId);

        res.status(200).json(data);
      } catch (error) {
        console.log(error)
      }
    }
}

