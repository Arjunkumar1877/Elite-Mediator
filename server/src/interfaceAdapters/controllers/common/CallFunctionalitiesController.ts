import { ICallingFunctionsUseCase } from "../../../entities/useCasesInterfaces/common/ICallingFunctionsUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class CallFunctionalitiesController{
    constructor(private icallfuntionalityusecase: ICallingFunctionsUseCase){};

    async StartingCallControl(req:Req, res: Res): Promise<void>{
        try {
            const data = await this.icallfuntionalityusecase.StartCall(req.body);

            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }

    async AcceptingCallControl(req: Req, res: Res): Promise<void>{
        try {
             const data = await this.icallfuntionalityusecase.AcceptCall(req.params.callerId);

             res.json(data)
        } catch (error) {
            console.log(error)
        }
    }

    async DecliningCallControl(req: Req, res: Res): Promise<void>{
        try {
             const data = await this.icallfuntionalityusecase.DeclineCall(req.params.callerId);

             res.json(data);
        } catch (error) {
            console.log(error)
        }
    }

    async DisconnectingControl(req: Req, res: Res): Promise<void>{
        try {
            const data = await this.icallfuntionalityusecase.DisconnectCall(req.params.callerId);
            res.json(data);
        } catch (error) {
            console.log(error);
        }
    }
}