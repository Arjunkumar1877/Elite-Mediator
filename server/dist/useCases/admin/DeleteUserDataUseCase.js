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
exports.DeleteUserDataUseCase = void 0;
class DeleteUserDataUseCase {
    constructor(iadminrepository) {
        this.iadminrepository = iadminrepository;
    }
    ;
    DeleteUserDataAndConversation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.iadminrepository.FindUserByUserId(userId);
                const conId = userData === null || userData === void 0 ? void 0 : userData.conversationId;
                const deletedConversation = yield this.iadminrepository.FindConversationByIdAndDelete(conId);
                const deleteUserData = yield this.iadminrepository.FindUserByIdAndDelete(userId);
                if (deletedConversation && deleteUserData) {
                    yield this.iadminrepository.FindAndClearAdminChatMessages(conId);
                    return 'deleted';
                }
                else {
                    return 'failed';
                }
            }
            catch (error) {
                console.error("Error deleting user data and conversation", error);
                return 'failed';
            }
        });
    }
}
exports.DeleteUserDataUseCase = DeleteUserDataUseCase;
