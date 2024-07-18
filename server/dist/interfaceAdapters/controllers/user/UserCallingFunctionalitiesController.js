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
exports.UserCallingFunctionalitiesController = void 0;
const SendPushNotification_1 = require("../../../frameworks/services/pushNotication/SendPushNotification");
class UserCallingFunctionalitiesController {
    constructor(iusercallingfunctionalitiesusecase) {
        this.iusercallingfunctionalitiesusecase = iusercallingfunctionalitiesusecase;
    }
    ;
    StartingCallControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.iusercallingfunctionalitiesusecase.UserStartCall(req.body.callData);
                const link = `${req.protocol}://${req.headers.host}/call_admin_page?conId=${data.conversationId}&incommingId=${data.userId}&callerId=${data._id}`;
                yield (0, SendPushNotification_1.sendPushMessage)(`Call from ${req.body.username}`, "Incomming call", req.body.token, link);
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
                const data = yield this.iusercallingfunctionalitiesusecase.UserAcceptCall(req.params.callerId);
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
                const data = yield this.iusercallingfunctionalitiesusecase.UserDisconnectCall(req.params.callerId);
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
                const data = yield this.iusercallingfunctionalitiesusecase.UserDisconnectCall(req.params.callerId);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserCallingFunctionalitiesController = UserCallingFunctionalitiesController;
