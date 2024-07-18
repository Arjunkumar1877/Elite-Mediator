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
exports.VerifyAndUpdateUserController = void 0;
class VerifyAndUpdateUserController {
    constructor(iverifyandupdateuserusecase) {
        this.iverifyandupdateuserusecase = iverifyandupdateuserusecase;
    }
    ;
    VerifyAndUpdateUserControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("⛔⛔💹💹💹💹💹💹");
                const data = yield this.iverifyandupdateuserusecase.FindUserAndUpdate(req.params.id);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.VerifyAndUpdateUserController = VerifyAndUpdateUserController;
