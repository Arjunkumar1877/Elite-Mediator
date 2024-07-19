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
exports.DeleteAdminPropertyController = void 0;
class DeleteAdminPropertyController {
    constructor(ideleteadminpropertyusecase) {
        this.ideleteadminpropertyusecase = ideleteadminpropertyusecase;
    }
    ;
    DeleteAdminPropertyControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.propertyId;
                const isDeleted = this.ideleteadminpropertyusecase.DeleteAdminsProperty(id);
                res.json({ success: isDeleted });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.DeleteAdminPropertyController = DeleteAdminPropertyController;
