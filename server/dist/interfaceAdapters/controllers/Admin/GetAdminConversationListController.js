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
exports.GetAdminConversationListController = void 0;
class GetAdminConversationListController {
    constructor(igetconversationlistusecase) {
        this.igetconversationlistusecase = igetconversationlistusecase;
    }
    ;
    GetConversationListControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { adminId, page = 1, propertyFilter, startDate, endDate } = req.query;
                let limit = 10;
                console.log("HAI IAM CONVRESATION LIST CONTROLLER 🤷‍♂️🤷‍♂️🤷‍♂️💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕");
                const conversations = yield this.igetconversationlistusecase.FilterOutAllConversationList(adminId, page, propertyFilter, startDate, endDate);
                const totalConversations = yield this.igetconversationlistusecase.FindConversationListCount(adminId);
                const totalPages = Math.ceil(totalConversations / limit);
                console.log(totalPages + "🔥🔥🔥 total docs");
                console.log(totalConversations + "🔥🔥🔥 total con");
                res.json({ conversations, totalPages });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.GetAdminConversationListController = GetAdminConversationListController;
