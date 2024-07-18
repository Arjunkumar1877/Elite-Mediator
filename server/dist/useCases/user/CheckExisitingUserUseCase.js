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
exports.CheckExisitingUserUseCase = void 0;
class CheckExisitingUserUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    CheckExisitingUser(phone, propId, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.iuserrepository.FindByPhoneAndPropId(phone, propId);
            if (user) {
                if (user.verified) {
                    return user;
                }
                else {
                    const userdeleted = yield this.iuserrepository.FindByPhoneAndPropIdAndDelete(phone, propId);
                    return "user not verified";
                }
            }
            else {
                return 'user does not exist';
            }
        });
    }
}
exports.CheckExisitingUserUseCase = CheckExisitingUserUseCase;
