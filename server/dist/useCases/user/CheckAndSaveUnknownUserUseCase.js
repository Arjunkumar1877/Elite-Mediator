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
exports.CheckAndSaveUnknownUserUseCase = void 0;
class CheckAndSaveUnknownUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    CheckAndSaveTheUnknownUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(user === null || user === void 0 ? void 0 : user.macId) || !(user === null || user === void 0 ? void 0 : user.propId)) {
                    throw new Error("macId and propId are required fields.");
                }
                const userExists = yield this.userRepository.FindUserByMacId(user.macId, user.propId);
                if (userExists) {
                    console.log(userExists);
                    console.log("exsisting");
                    return userExists;
                }
                else {
                    const saveData = yield this.userRepository.CreateNewUser(user);
                    console.log("not exsisting");
                    if (saveData) {
                        const userData = this.userRepository.FindUserByIdPopulateAdminData(saveData._id);
                        return userData;
                    }
                }
            }
            catch (error) {
                console.error("Error in CheckAndSaveTheUnknownUser:", error);
                throw new Error("Failed to check and save the unknown user.");
            }
        });
    }
}
exports.CheckAndSaveUnknownUserUseCase = CheckAndSaveUnknownUserUseCase;
