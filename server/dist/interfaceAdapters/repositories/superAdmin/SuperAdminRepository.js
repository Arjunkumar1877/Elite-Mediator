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
exports.MongoSuperAdminRepository = void 0;
const AdminModel_1 = require("../../../frameworks/database/models/admin/AdminModel");
const QrDataModel_1 = require("../../../frameworks/database/models/admin/QrDataModel");
const PostersModel_1 = require("../../../frameworks/database/models/superAdmin/PostersModel");
const SuperAdminModel_1 = require("../../../frameworks/database/models/superAdmin/SuperAdminModel");
const User_1 = require("../../../frameworks/database/models/user/User");
class MongoSuperAdminRepository {
    FindByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SuperAdminModel_1.SuperAdminModel.findOne({ email });
        });
    }
    FindAllAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminModel_1.AdminModel.find().sort({ createdAt: -1 });
        });
    }
    FindAnAdminByIdForSuperAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminModel_1.AdminModel.findOne({ _id: adminId });
        });
    }
    FindFilteredUserForSuperAdmin(adminId, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterUser = { adminId };
            // console.log("super admin repository 💕💕💕💕💕💕💕💕💕💕💕💕💕🖼️🖼️")
            // console.log(userType, " ", adminId)
            if (userType === 'All') {
                const users = yield User_1.UserModel.find({ adminId: adminId });
                // console.log(users)
                return users;
            }
            else {
                const properties = yield QrDataModel_1.QrModel.find({ userType });
                const propertyIds = properties.map(property => property._id);
                filterUser.propId = { $in: propertyIds };
            }
            const filteredUsers = yield User_1.UserModel.find(filterUser);
            return filteredUsers;
        });
    }
    FindAPosterByIdAndUpdate(imageUrl, posterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const saved = yield PostersModel_1.PosterModel.findOneAndUpdate({ _id: posterId }, {
                $set: {
                    imageUrl: imageUrl
                }
            }, { new: true });
            if (saved) {
                return "saved";
            }
            else {
                return "failed";
            }
        });
    }
    FindAllPosters() {
        return __awaiter(this, void 0, void 0, function* () {
            const posters = yield PostersModel_1.PosterModel.find({});
            return posters;
        });
    }
    FindByIdAndBlockAnAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blocked = yield AdminModel_1.AdminModel.findOneAndUpdate({ _id: adminId }, {
                $set: {
                    blocked: true
                }
            });
            if (blocked) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    FindByIdAndUnblockAnAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Unblocked = yield AdminModel_1.AdminModel.findOneAndUpdate({ _id: adminId }, {
                $set: {
                    blocked: false
                }
            });
            if (Unblocked) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.MongoSuperAdminRepository = MongoSuperAdminRepository;
