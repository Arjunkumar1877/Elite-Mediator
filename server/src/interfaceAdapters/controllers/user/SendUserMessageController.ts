import { ISendAndCreateUserMessageUseCase } from "../../../entities/useCasesInterfaces/user/ISendAndCreateUserMessageUseCase";
import { sendPushMessage } from "../../../frameworks/services/pushNotication/SendPushNotification";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class SendUserMessageController {
  constructor(
    private isendandcreateusermessageusecase: ISendAndCreateUserMessageUseCase
  ) {}

  async SendUserMessageControl(req: Req, res: Res): Promise<void> {
    try {
      console.log(req.body);
      const message: any = req.body.messageData;
      const token: string = req.body.token;
      const username: string = req.body.username;

      const data = await this.isendandcreateusermessageusecase.SendNewMessageByUser(
        message
      );

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
    } catch (error) {
      console.log(error);
    }
  }
}
