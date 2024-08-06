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
exports.AdminSignupUseCase = void 0;
const bcrypt_1 = require("bcrypt");
class AdminSignupUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    AdminSignupExecut(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const ExisitingEmail = yield this.adminRepository.FindAdminByEmail(admin.email);
            const ExisitingPhone = yield this.adminRepository.FindAdminByPhone(admin.phone);
            if (ExisitingEmail) {
                return "Email already exists";
            }
            if (ExisitingPhone) {
                return "Phone number already exists";
            }
            try {
                console.log("AdminUseCase");
                const hashedPassword = (0, bcrypt_1.hashSync)(admin.password, 10);
                admin.password = hashedPassword;
                const adminData = yield this.adminRepository.CreateAdmin(admin);
                return adminData;
            }
            catch (error) {
                if (error.code === 11000) {
                    // Handling the duplicate key error
                    if (error.keyPattern.email) {
                        return "Email already exists";
                    }
                    if (error.keyPattern.phone) {
                        return "Phone number already exists";
                    }
                }
                throw error; // rethrow if it's some other error
            }
        });
    }
}
exports.AdminSignupUseCase = AdminSignupUseCase;
