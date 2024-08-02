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
exports.GetAllAdminsForSuperAdminController = void 0;
class GetAllAdminsForSuperAdminController {
    constructor(igetalladminsforsuperadminusecase) {
        this.igetalladminsforsuperadminusecase = igetalladminsforsuperadminusecase;
    }
    ;
    GetAllAdminForSuperAdminContol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.igetalladminsforsuperadminusecase.FindAllAdmins();
                res.status(200).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.GetAllAdminsForSuperAdminController = GetAllAdminsForSuperAdminController;
