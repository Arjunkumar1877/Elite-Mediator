import { IAdminCallingFunctionsUseCase } from "../../../entities/useCasesInterfaces/Admin/IAdminCallingFunctionalitesUseCase";
import { sendPushMessage } from "../../../frameworks/services/pushNotication/SendPushNotification";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class  AdminCallingFunctionalitiesController{
  constructor(private iadmincallingfunctionalitiesusecase: IAdminCallingFunctionsUseCase){}

  async StartingCallControl(req:Req, res: Res): Promise<void>{
    try {

        console.log(req.body)
        const data:any = await this.iadmincallingfunctionalitiesusecase.AdminStartCall(req.body.callData);
        const url: string =  `${req.protocol}://${req.headers.host}/call_page_user?conId=${data.conversationId}&incommingId=${data.adminId}&callerId=${data._id}`;
        if(data){
            console.log(url + "💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕")
            await sendPushMessage(`Call from ${req.body.username}`, "Incomming call", req.body.token, url);
        }
    
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

async AcceptingCallControl(req: Req, res: Res): Promise<void>{
    try {
         const data = await this.iadmincallingfunctionalitiesusecase.AdminAcceptCall(req.params.callerId);

         res.json(data)
    } catch (error) {
        console.log(error)
    }
}

async DecliningCallControl(req: Req, res: Res): Promise<void>{
    try {
         const data = await this.iadmincallingfunctionalitiesusecase.AdminDeclineCall(req.params.callerId);

         res.json(data);
    } catch (error) {
        console.log(error)
    }
}

async DisconnectingControl(req: Req, res: Res): Promise<void>{
    try {
        const data = await this.iadmincallingfunctionalitiesusecase.AdminDisconnectCall(req.params.callerId);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}
}