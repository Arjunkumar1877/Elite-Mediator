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
exports.CheckAndSaveVerifiedUseUseCase = void 0;
class CheckAndSaveVerifiedUseUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    ;
    CheckAndSaveVerifiedUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.iuserrepository.FindByPhoneAndPropId(user.phone, user.propId);
            if (existingUser) {
                return existingUser;
            }
            else {
                const userCreated = yield this.iuserrepository.CreateNewUser(user);
                if (userCreated) {
                    const userData = yield this.iuserrepository.FindUserByIdPopulateAdminData(userCreated._id);
                    return userData;
                }
            }
        });
    }
}
exports.CheckAndSaveVerifiedUseUseCase = CheckAndSaveVerifiedUseUseCase;
