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
exports.GetSelectedConversationController = void 0;
class GetSelectedConversationController {
    constructor(igetselectedconversationusecase) {
        this.igetselectedconversationusecase = igetselectedconversationusecase;
    }
    ;
    GetSelectedConversationControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield this.igetselectedconversationusecase.GetTheSelectedConversation(id);
            console.log("get selected conversatio controller 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥💕💕😣😣");
            res.json(data);
        });
    }
}
exports.GetSelectedConversationController = GetSelectedConversationController;
