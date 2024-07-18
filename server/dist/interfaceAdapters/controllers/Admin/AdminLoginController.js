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
exports.AdminLoginController = void 0;
class AdminLoginController {
    constructor(iadminloginusecase) {
        this.iadminloginusecase = iadminloginusecase;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("login ❤️❤️❤️❤️");
            try {
                const data = yield this.iadminloginusecase.LoginVerifyAdmin(req.body.email, req.body.password);
                console.log(data);
                console.log(req.body.token);
                const token = req.body.token;
                res.cookie("access_token", token, { httpOnly: true }).json(data);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.AdminLoginController = AdminLoginController;
