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
exports.SendAndCreateUserMessageUseCase = void 0;
class SendAndCreateUserMessageUseCase {
    constructor(iuserRepository) {
        this.iuserRepository = iuserRepository;
    }
    ;
    SendNewMessageByUser(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message);
            console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
            const userData = yield this.iuserRepository.FindUserByUserId(message.senderId);
            if (userData && userData.deleted === true) {
                const updateConversation = yield this.iuserRepository.FindConversationAndUpdateDeleted(userData === null || userData === void 0 ? void 0 : userData.conversationId);
                const updateUser = yield this.iuserRepository.FindUserAndUpdateDeletedUser(message.senderId);
                console.log(updateConversation);
                console.log(updateUser);
            }
            const newMessage = yield this.iuserRepository.CreateUserNewMessageToDb(message);
            return newMessage;
        });
    }
}
exports.SendAndCreateUserMessageUseCase = SendAndCreateUserMessageUseCase;
