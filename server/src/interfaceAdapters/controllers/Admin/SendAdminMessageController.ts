import { ISendAndCreateAdminMessageUseCase } from "../../../entities/useCasesInterfaces/Admin/ISendAndCreateAdminMessageUseCase";
import { sendPushMessage } from "../../../frameworks/services/pushNotication/SendPushNotification";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class  SendAdminMessageController{
 constructor(private isendandcreateadminmessageusecase: ISendAndCreateAdminMessageUseCase){};

 async SendAdminMessageControl(req: Req, res: Res): Promise<void>{
    console.log(req.body);
    const message: any = req.body.messageData;
    const token: string = req.body.token;
    const username: string = req.body.username;
    const data = await this.isendandcreateadminmessageusecase.SendNeMessageByAdmin(message);

    
    if (data.text.startsWith("https://")) {
        const message = sendPushMessage(
          "🖼️ User shared a media file",
          username,
          token
        );
      } else {
        const message = sendPushMessage(data.text, username, token);
      }

      res.json(data);
 }

}