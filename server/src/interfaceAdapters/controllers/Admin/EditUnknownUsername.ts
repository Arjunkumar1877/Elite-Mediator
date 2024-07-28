import { IEditUnknownUsernameUseCase } from "../../../entities/useCasesInterfaces/admin/IEditUnknownUsernameUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class EditUnknownUsername{
  
    constructor(private ieditunknownusernameusecase: IEditUnknownUsernameUseCase){};

    async EditUnknownUsernameControl(req: Req, res: Res): Promise<void>{
        try {
            const data = await this.ieditunknownusernameusecase.EditUnknownUsername(req.body.id, req.body.username);

            res.json(data);
        } catch (error) {
            res.json(error)
        }
    }
    
}