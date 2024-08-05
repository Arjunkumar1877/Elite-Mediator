import { ISendAndCreateAdminMessageUseCase } from "../../../entities/useCasesInterfaces/admin/ISendAndCreateAdminMessageUseCase";
import { sendPushMessageFromAdminToUser } from "../../../frameworks/services/pushNotication/SendPushNotification";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class  SendAdminMessageController{
 constructor(private isendandcreateadminmessageusecase: ISendAndCreateAdminMessageUseCase){};

 async SendAdminMessageControl(req: Req, res: Res): Promise<void>{
    console.log(req.body);
    const message: any = req.body.messageData;
    const token: string = req.body.token;
    const username: string = req.body.username;
    const data = await this.isendandcreateadminmessageusecase.SendNeMessageByAdmin(message);

    console.log("🖼️🖼️🖼️🖼️🖼️🖼️")
    console.log(username, token , " By Admin")
    console.log("🖼️🖼️🖼️🖼️🖼️🖼️")
let link =   `${req.protocol}://${req.headers.host}/chat_user?conId=${message.conversationId}`;
    
    if (data.text.startsWith("https://")) {
        const message = await sendPushMessageFromAdminToUser(
          "🖼️ User shared a media file",
          username,
          token,
          link
        );
      } else {
        const message = await sendPushMessageFromAdminToUser(data.text, username, token, link);
        console.log("pushed messge by admin to user 🔥🔥🔥🔥💕💕💕💕💕")
      }

     await sendPushMessageFromAdminToUser(data.text, username, token, link);


      res.json(data);
 }

}