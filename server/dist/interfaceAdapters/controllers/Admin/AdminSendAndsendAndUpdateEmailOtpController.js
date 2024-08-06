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
exports.AdminSendAndUpdateEmailOtpController = void 0;
class AdminSendAndUpdateEmailOtpController {
    constructor(iadminsendemailotpandupdatetodbusecase) {
        this.iadminsendemailotpandupdatetodbusecase = iadminsendemailotpandupdatetodbusecase;
    }
    SendEmailOtpAndSaveToDbControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                if (!id) {
                    res.status(400).json({ message: 'ID is required' });
                    return;
                }
                const result = yield this.iadminsendemailotpandupdatetodbusecase.SendEmailOtpAndupdateToDb(id);
                if (result) {
                    res.status(200).json({ success: true, data: result });
                }
                else {
                    res.status(500).json({ success: false, data: result });
                }
            }
            catch (error) {
                console.error('Error in SendEmailOtpAndSaveToDbControl:', error.message);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.AdminSendAndUpdateEmailOtpController = AdminSendAndUpdateEmailOtpController;
