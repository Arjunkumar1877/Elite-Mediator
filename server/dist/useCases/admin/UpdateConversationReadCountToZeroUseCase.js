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
exports.UpdateConversationReadCountToZeroUseCase = void 0;
class UpdateConversationReadCountToZeroUseCase {
    constructor(iadminrepository) {
        this.iadminrepository = iadminrepository;
    }
    UpdateConversationReadCount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const con = yield this.iadminrepository.FindConversationById(id);
            if (((_a = con === null || con === void 0 ? void 0 : con.lastMessage) === null || _a === void 0 ? void 0 : _a.text) && ((_b = con === null || con === void 0 ? void 0 : con.lastMessage) === null || _b === void 0 ? void 0 : _b.time)) {
                // Ensure the time is of type Date
                const time = typeof con.lastMessage.time === 'string' ? new Date(con.lastMessage.time) : con.lastMessage.time;
                const update = yield this.iadminrepository.UpdateLastMessageUnreadToZero(id, con.lastMessage.text, time, 0);
                if (update) {
                    console.log(update);
                    const conversations = yield this.iadminrepository.FindAdminsConversationsByAdminId(update.adminId);
                    return conversations;
                }
                else {
                    // Handle the case where the update fails
                    throw new Error('Failed to update the last message unread count to zero.');
                }
            }
            else {
                // Handle the case where lastMessage or its properties are undefined
                console.log('Conversation last message is missing text or time.');
            }
        });
    }
}
exports.UpdateConversationReadCountToZeroUseCase = UpdateConversationReadCountToZeroUseCase;
