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
exports.CreateConversationController = void 0;
class CreateConversationController {
    constructor(icreateconversationusecase, igetuserdatabyid) {
        this.icreateconversationusecase = icreateconversationusecase;
        this.igetuserdatabyid = igetuserdatabyid;
    }
    ;
    CreateConversationControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, adminId, propertyId } = req.body;
                const conversationData = yield this.icreateconversationusecase.CreateConvesationUseCase(userId, adminId, propertyId);
                const userData = yield this.igetuserdatabyid.GetTheUserDataById(userId);
                // const userData = await 
                res.json({ conversation: conversationData, user: userData });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.CreateConversationController = CreateConversationController;
