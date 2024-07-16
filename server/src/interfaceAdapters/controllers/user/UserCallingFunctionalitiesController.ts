import { IUserCallingFunctionalitiesUseCase } from "../../../entities/useCasesInterfaces/user/IUserCallingFunctionalitiesUseCase";
import { sendPushMessage } from "../../../frameworks/services/pushNotication/SendPushNotification";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class UserCallingFunctionalitiesController{
    constructor(private iusercallingfunctionalitiesusecase: IUserCallingFunctionalitiesUseCase){};

    
    async StartingCallControl(req:Req, res: Res): Promise<void>{
        try {

            console.log(req.body)
            const data:any = await this.iusercallingfunctionalitiesusecase.UserStartCall(req.body.callData);
            const link: string = `${req.protocol}://${req.headers.host}/call_admin_page?conId=${data.conversationId}&incommingId=${data.userId}&callerId=${data._id}`;
           await sendPushMessage(`Call from ${req.body.username}`, "Incomming call", req.body.token, link);
        
            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }

    async AcceptingCallControl(req: Req, res: Res): Promise<void>{
        try {
             const data = await this.iusercallingfunctionalitiesusecase.UserAcceptCall(req.params.callerId);

             res.json(data)
        } catch (error) {
            console.log(error)
        }
    }

    async DecliningCallControl(req: Req, res: Res): Promise<void>{
        try {
             const data = await this.iusercallingfunctionalitiesusecase.UserDisconnectCall(req.params.callerId);

             res.json(data);
        } catch (error) {
            console.log(error)
        }
    }

    async DisconnectingControl(req: Req, res: Res): Promise<void>{
        try {
            const data = await this.iusercallingfunctionalitiesusecase.UserDisconnectCall(req.params.callerId);
            res.json(data);
        } catch (error) {
            console.log(error);
        }
    }
}