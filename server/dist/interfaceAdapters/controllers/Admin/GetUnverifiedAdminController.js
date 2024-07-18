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
exports.GetUnverifiedAdminController = void 0;
class GetUnverifiedAdminController {
    constructor(getunverifiedadminusecase) {
        this.getunverifiedadminusecase = getunverifiedadminusecase;
    }
    getUnverifiedAdminController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = parseInt(req.params.phone);
                const data = yield this.getunverifiedadminusecase.GetUnverifiedAdminData(phone);
                if (data) {
                    res.json(data);
                }
                else {
                    res.json("error finding data");
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.GetUnverifiedAdminController = GetUnverifiedAdminController;
