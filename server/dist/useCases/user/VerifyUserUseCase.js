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
exports.VerifyUserUseCase = void 0;
class VerifyUserUseCase {
    constructor(iuserRepository) {
        this.iuserRepository = iuserRepository;
    }
    ;
    FindUserAndUpdate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.iuserRepository.FindUserByUserId(userId);
            if (userData === null || userData === void 0 ? void 0 : userData.verified) {
                console.log("user already verified and data sended");
                return userData;
            }
            else {
                console.log("user  verified now and data sended");
                return this.iuserRepository.FindByIdAndVerify(userId);
            }
        });
    }
}
exports.VerifyUserUseCase = VerifyUserUseCase;
