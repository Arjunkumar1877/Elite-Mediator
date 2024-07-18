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
exports.AdminLoginUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminLoginUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    ;
    LoginVerifyAdmin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.FindAdminByEmail(email);
            if (!admin) {
                return "Invalid credentials";
            }
            const passwordMatch = bcrypt_1.default.compareSync(password, admin.password);
            if (passwordMatch) {
                return admin;
            }
            else {
                return "Invalid credentials";
            }
        });
    }
}
exports.AdminLoginUseCase = AdminLoginUseCase;
