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
exports.ClearAdminChatMessagesController = void 0;
class ClearAdminChatMessagesController {
    constructor(iclearadminchatmessages) {
        this.iclearadminchatmessages = iclearadminchatmessages;
    }
    clearAllAdminMessagesControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conId } = req.params;
                const result = yield this.iclearadminchatmessages.ClearAdminChatMessages(conId);
                res.status(200).json({
                    success: true,
                    message: `Messages with conversation ID ${conId} have been marked as deleted.`,
                    result
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'An error occurred while updating messages.',
                    error: error.message
                });
            }
        });
    }
}
exports.ClearAdminChatMessagesController = ClearAdminChatMessagesController;
