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
exports.GetUsersListController = void 0;
class GetUsersListController {
    constructor(igetuserslistusecase) {
        this.igetuserslistusecase = igetuserslistusecase;
    }
    GetTheUserListControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { adminId, startDate, endDate, propertyName, userType } = req.query;
                if (!adminId) {
                    res.status(400).json({ message: "Admin ID is required" });
                    return;
                }
                const data = yield this.igetuserslistusecase.GetTheUserList(adminId, startDate, endDate, propertyName, userType);
                if (!data.length) {
                    res.status(404).json({ message: "No users found" });
                    return;
                }
                res.status(200).json(data);
            }
            catch (error) {
                console.error("Error fetching users list:", error);
                res.status(500).json({ message: "Server error" });
            }
        });
    }
}
exports.GetUsersListController = GetUsersListController;
