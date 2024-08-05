import { ISendAndCreateUserMessageUseCase } from "../../../entities/useCasesInterfaces/user/ISendAndCreateUserMessageUseCase";
import { sendPushMessage } from "../../../frameworks/services/pushNotication/SendPushNotification";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class SendUserMessageController {
  constructor(
    private isendandcreateusermessageusecase: ISendAndCreateUserMessageUseCase
  ) {}

  async SendUserMessageControl(req: Req, res: Res): Promise<void> {
    try {
      // console.log(req.body);
    console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️😥😥😥 controller for sending messages from user to admin")

      const message: any = req.body.messageData;
      const token: string[] = req.body.token;
      const username: string = req.body.username;

      const data = await this.isendandcreateusermessageusecase.SendNewMessageByUser(
        message
      );

      console.log("🖼️🖼️🖼️🖼️🖼️🖼️")
      console.log(username, token , " By user ")
      console.log("🖼️🖼️🖼️🖼️🖼️🖼️")
      const link: string = `${req.protocol}://${req.headers.host}/admin_chat?conId=${message.conversationId}`;


    

      if (data.text.startsWith("https://")) {
        const message = await sendPushMessage(
          "🖼️ User shared a media file",
          username,
          token,
          link
        );
      } else {
        const message = await sendPushMessage(data.text, username, token, link);
      }

      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
