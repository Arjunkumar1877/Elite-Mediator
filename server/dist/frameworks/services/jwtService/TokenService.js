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
exports.JwtTokenAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("../../../entities/utils/errors/Error.");
const errorFun = new Error_1.Errors();
class JwtTokenAdapter {
    // constructor(private adminrepository: MongoAdminRepository) {}
    CreateJwtToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const admin = await this.adminrepository.FindAdminByEmail(req.body.email);
                const token = yield jsonwebtoken_1.default.sign({ email: req.body.email }, "hellooooo", { expiresIn: "600m" });
                console.log(req.body);
                console.log("📀📀📀📀📀📀📀");
                req.body.token = token;
                next();
            }
            catch (error) {
                next(errorFun.errorHandler(500, "Token creation failed"));
            }
        });
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.access_token;
            if (!token) {
                return next(errorFun.errorHandler(401, "Unauthorized"));
            }
            jsonwebtoken_1.default.verify(token, "hellooooo", (err, user) => {
                if (err) {
                    return next(errorFun.errorHandler(401, "Unauthorized"));
                }
                req.body.user = user;
                console.log("verified ❤️❤️❤️❤️❤️📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉📉");
                next();
            });
        });
    }
    removeToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("access_token");
                res.status(200).json({ message: "success" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.JwtTokenAdapter = JwtTokenAdapter;
