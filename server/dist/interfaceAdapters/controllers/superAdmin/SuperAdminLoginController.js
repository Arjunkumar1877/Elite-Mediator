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
exports.SuperAdminLoginController = void 0;
const SuperAdminLoginUsecase_1 = require("../../../useCases/superAdmin/SuperAdminLoginUsecase");
const SuperAdminRepository_1 = require("../../repositories/superAdmin/SuperAdminRepository");
const superAdminRepository = new SuperAdminRepository_1.MongoSuperAdminRepository();
class SuperAdminLoginController {
    static SuperAdminLoginControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginSuperAdmin = new SuperAdminLoginUsecase_1.SuperAdminLoginUseCase(superAdminRepository);
                const data = yield loginSuperAdmin.SuperAdminLogin(req.body.email, req.body.password);
                console.log("Super admin loginController");
                res.json(data);
            }
            catch (error) {
                res.status(404).json(error);
                console.log(error);
            }
        });
    }
}
exports.SuperAdminLoginController = SuperAdminLoginController;
