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
exports.SaveNewUserDataUseCase = void 0;
class SaveNewUserDataUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    ;
    SaveNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.iuserrepository.CreateNewUser(user);
            if (newUser) {
                const userData = this.iuserrepository.FindUserByIdPopulateAdminData(newUser._id);
                return userData;
            }
        });
    }
}
exports.SaveNewUserDataUseCase = SaveNewUserDataUseCase;
