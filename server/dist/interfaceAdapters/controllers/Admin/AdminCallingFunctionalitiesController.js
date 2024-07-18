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
exports.AdminCallingFunctionalitiesController = void 0;
const SendPushNotification_1 = require("../../../frameworks/services/pushNotication/SendPushNotification");
class AdminCallingFunctionalitiesController {
    constructor(iadmincallingfunctionalitiesusecase) {
        this.iadmincallingfunctionalitiesusecase = iadmincallingfunctionalitiesusecase;
    }
    StartingCallControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.iadmincallingfunctionalitiesusecase.AdminStartCall(req.body.callData);
                const url = `${req.protocol}://${req.headers.host}/call_page_user?conId=${data.conversationId}&incommingId=${data.adminId}&callerId=${data._id}`;
                if (data) {
                    console.log(url + "💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕");
                    yield (0, SendPushNotification_1.sendPushMessage)(`Call from ${req.body.username}`, "Incomming call", req.body.token, url);
                }
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AcceptingCallControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.iadmincallingfunctionalitiesusecase.AdminAcceptCall(req.params.callerId);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DecliningCallControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.iadmincallingfunctionalitiesusecase.AdminDeclineCall(req.params.callerId);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DisconnectingControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.iadmincallingfunctionalitiesusecase.AdminDisconnectCall(req.params.callerId);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.AdminCallingFunctionalitiesController = AdminCallingFunctionalitiesController;
