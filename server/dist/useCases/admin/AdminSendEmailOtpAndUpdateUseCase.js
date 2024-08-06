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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSendEmailOtpAndUpdateUseCase = void 0;
const nodeMailer_1 = require("../../frameworks/services/NodeMailerService/nodeMailer");
const otp_generator_1 = __importDefault(require("otp-generator"));
class AdminSendEmailOtpAndUpdateUseCase {
    constructor(iadminrepository) {
        this.iadminrepository = iadminrepository;
    }
    ;
    SendEmailOtpAndupdateToDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminData = yield this.iadminrepository.FindAdminById(id);
            const OTP = otp_generator_1.default.generate(6, {
                upperCaseAlphabets: true,
                lowerCaseAlphabets: false,
                specialChars: false,
                digits: false,
            });
            if (adminData) {
                const sendEmailOtp = yield (0, nodeMailer_1.SendEmailOtp)(adminData === null || adminData === void 0 ? void 0 : adminData.email, OTP);
                if (sendEmailOtp.success) {
                    return yield this.iadminrepository.UpdateUnverifiedAdmin(OTP, adminData === null || adminData === void 0 ? void 0 : adminData.phone);
                }
                else {
                    console.log("Error sending email otp in the nodemailer");
                }
            }
            else {
                console.log("user not found to update the email otp send to the user");
            }
        });
    }
}
exports.AdminSendEmailOtpAndUpdateUseCase = AdminSendEmailOtpAndUpdateUseCase;
