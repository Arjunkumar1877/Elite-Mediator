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
exports.GetAdminPropertDataForFilteringController = void 0;
class GetAdminPropertDataForFilteringController {
    constructor(igetadminpropertydataforfilteringusecase) {
        this.igetadminpropertydataforfilteringusecase = igetadminpropertydataforfilteringusecase;
    }
    ;
    GetAdminPropertyDataForFilteringControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("propert data for filtering 📀📀💕💕🔥🔥🔥🔥🔥❤️❤️❤️❤️");
                const data = yield this.igetadminpropertydataforfilteringusecase.GetAdminPropertDataForFiltering(req.params.adminId);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.GetAdminPropertDataForFilteringController = GetAdminPropertDataForFilteringController;
