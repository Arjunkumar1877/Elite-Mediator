"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendAdminMessageController = void 0;
const SendPushNotification_1 = require("../../../frameworks/services/pushNotication/SendPushNotification");
class SendAdminMessageController {
    constructor(isendandcreateadminmessageusecase) {
        this.isendandcreateadminmessageusecase = isendandcreateadminmessageusecase;
    }
    ;
    SendAdminMessageControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const message = req.body.messageData;
            const token = req.body.token;
            const username = req.body.username;
            const data = yield this.isendandcreateadminmessageusecase.SendNeMessageByAdmin(message);
            console.log("🖼️🖼️🖼️🖼️🖼️🖼️");
            console.log(username, token, " By Admin");
            console.log("🖼️🖼️🖼️🖼️🖼️🖼️");
            let link = `${req.protocol}://${req.headers.host}/chat_user?conId=${message.conversationId}`;
            if (data.text.startsWith("https://")) {
                const message = yield (0, SendPushNotification_1.sendPushMessageFromAdminToUser)("🖼️ User shared a media file", username, token, link);
            }
            else {
                const message = yield (0, SendPushNotification_1.sendPushMessageFromAdminToUser)(data.text, username, token, link);
                console.log("pushed messge by admin to user 🔥🔥🔥🔥💕💕💕💕💕");
            }
            yield (0, SendPushNotification_1.sendPushMessageFromAdminToUser)(data.text, username, token, link);
            res.json(data);
        });
    }
}
exports.SendAdminMessageController = SendAdminMessageController;
