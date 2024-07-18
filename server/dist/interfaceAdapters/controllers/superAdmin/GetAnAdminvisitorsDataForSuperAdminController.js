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
exports.GetAnAdminvisitorsDataForSuperAdminController = void 0;
class GetAnAdminvisitorsDataForSuperAdminController {
    constructor(igetanadminvisitorsforsuperadminusecase) {
        this.igetanadminvisitorsforsuperadminusecase = igetanadminvisitorsforsuperadminusecase;
    }
    ;
    GetAnAdminsVisitorsConrol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("super admin 📀📀📀💕💕🔥🔥🔥🔥🔥🔥🔥🔥");
                // console.log(req.body)
                const data = yield this.igetanadminvisitorsforsuperadminusecase.GetVisitorsOfanAdmin(req.body.adminId, req.body.userType);
                res.status(200).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.GetAnAdminvisitorsDataForSuperAdminController = GetAnAdminvisitorsDataForSuperAdminController;
