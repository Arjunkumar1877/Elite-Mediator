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
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(isavenewuserdatausecase, icheckexisitinguserusecase) {
        this.isavenewuserdatausecase = isavenewuserdatausecase;
        this.icheckexisitinguserusecase = icheckexisitinguserusecase;
    }
    UserCreateControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body.phone, req.body.propId, req.body.adminId);
                const userData = yield this.icheckexisitinguserusecase.CheckExisitingUser(req.body.phone, req.body.propId, req.body.adminId);
                if (userData === "user does not exist" || userData === "user not verified") {
                    console.log("Saveuserdata controller 💕💕💕💕");
                    console.log(req.body);
                    const data = yield this.isavenewuserdatausecase.SaveNewUser(req.body);
                    res.status(201).json({ data: data, message: "User created" });
                }
                else {
                    res
                        .status(200)
                        .json({ data: userData, message: "User already exists" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    SaveUnverifiedUsderControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.isavenewuserdatausecase.SaveNewUser(req.body);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
