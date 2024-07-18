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
exports.CreateConversationUseCase = void 0;
class CreateConversationUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    ;
    CreateConvesationUseCase(userId, adminId, propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exisitingConversation = yield this.iuserrepository.FindConversation(userId, adminId, propertyId);
            if (!exisitingConversation) {
                const newConversationCreate = yield this.iuserrepository.CreateConversation(userId, adminId, propertyId);
                return newConversationCreate;
            }
            else {
                return exisitingConversation;
            }
        });
    }
}
exports.CreateConversationUseCase = CreateConversationUseCase;
