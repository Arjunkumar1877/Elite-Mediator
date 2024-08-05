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
exports.MongoAdminRepository = void 0;
const AdminModel_1 = require("../../../frameworks/database/models/admin/AdminModel");
const QrDataModel_1 = require("../../../frameworks/database/models/admin/QrDataModel");
const ConversationModel_1 = require("../../../frameworks/database/models/admin/ConversationModel");
const CallModel_1 = require("../../../frameworks/database/models/admin/CallModel");
const User_1 = require("../../../frameworks/database/models/user/User");
const MessageModel_1 = require("../../../frameworks/database/models/admin/MessageModel");
class MongoAdminRepository {
    CreateAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("repository file mongo db functions 🤷‍♂️🤷‍♂️🤷‍♂️");
            return AdminModel_1.AdminModel.create(admin);
        });
    }
    GetUnverifiedAdmin(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return AdminModel_1.AdminModel.findOne({ phone });
        });
    }
    FindAdminByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminModel_1.AdminModel.findOne({ phone });
        });
    }
    UpdateUnverifiedAdmin(firebaseCode, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield AdminModel_1.AdminModel.findOneAndUpdate({ phone: phone }, { $set: { firebaseConfirm: firebaseCode } }, { new: true });
            return update;
        });
    }
    FindAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminExist = yield AdminModel_1.AdminModel.findOne({ email });
            return adminExist;
        });
    }
    GoogleOAuth(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield AdminModel_1.AdminModel.create(admin);
            newUser.verified = true;
            newUser.save();
            return newUser;
        });
    }
    FindAdminAndAddFcmToken(token, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AdminModel_1.AdminModel.findOneAndUpdate({ _id: adminId }, { $addToSet: { fcmToken: token } }, // Use $addToSet to avoid duplicates
                { new: true } // Return the updated document
                );
                if (!data) {
                    throw new Error(`Admin with id ${adminId} not found.`);
                }
                return data;
            }
            catch (error) {
                console.error('Error updating FCM token:', error);
                throw error;
            }
        });
    }
    FindAdminFcmToken(token, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminModel_1.AdminModel.findOne({ _id: adminId, fcmToken: token });
        });
    }
    UpdateAdminData(admin, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminModel_1.AdminModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    username: admin.username,
                    email: admin.email,
                    phone: admin.phone,
                    address: admin.address,
                    state: admin.state,
                    city: admin.city,
                    pincode: admin.pincode,
                    landmark: admin.landmark,
                    image: admin.image,
                },
            }, { new: true });
        });
    }
    FindAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("😂");
            const adminData = yield AdminModel_1.AdminModel.findOne({ _id: id });
            return adminData;
        });
    }
    CreatePropertyData(propertyData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield QrDataModel_1.QrModel.create(propertyData);
        });
    }
    FindAdminsPropertDatas(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield QrDataModel_1.QrModel.find({ adminId: adminId, deleted: false });
        });
    }
    FindAdminsPropertDatasForFilter(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield QrDataModel_1.QrModel.find({ adminId: adminId });
        });
    }
    FindConversationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Finding admin singleConversation by conversation id 💕💕💕💕💕🔥🔥🔥🔥🔥");
            return yield ConversationModel_1.ConversationModel.findById(id);
        });
    }
    UpdateLastMessageUnreadToZero(id, text, time, unread) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Updating conversation...");
                const updateCon = yield ConversationModel_1.ConversationModel.findOneAndUpdate({ _id: id }, {
                    $set: {
                        "lastMessage.text": text,
                        "lastMessage.time": time,
                        "lastMessage.unread": unread,
                    },
                }, { new: true });
                if (updateCon) {
                    console.log("Updated conversation 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
                }
                else {
                    console.log("No conversation found with the provided ID.");
                }
                return updateCon;
            }
            catch (error) {
                console.error("Error updating conversation:", error);
                throw new Error("Failed to update conversation");
            }
        });
    }
    FindAdminsConversationsByAdminId(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Finding conversations of the admin by using adminId 😣😣😣💕💕💕");
                const conversations = yield ConversationModel_1.ConversationModel.find({ adminId: adminId });
                if (conversations.length === 0) {
                    console.log("No conversations found for the given admin ID.");
                }
                else {
                    console.log(`Found ${conversations.length} conversations for the admin.`);
                }
                return conversations;
            }
            catch (error) {
                console.error("Error finding conversations by admin ID:", error);
                throw new Error("Failed to find conversations by admin ID");
            }
        });
    }
    FindSelectedConversation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield ConversationModel_1.ConversationModel.findOne({
                    _id: id,
                }).populate("userId propertyId");
                return conversation;
            }
            catch (error) {
                console.error("Error finding conversations by admin ID:", error);
                throw new Error("Failed to find the selected conversation  by admin ID");
            }
        });
    }
    FilterConversationList(adminId, page, propertyFilter, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = { adminId: adminId, deleted: false };
                const limit = 10;
                if (propertyFilter && propertyFilter !== "All") {
                    query.propertyId = propertyFilter;
                }
                if (startDate && endDate) {
                    query.createdAt = {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    };
                }
                const conversations = yield ConversationModel_1.ConversationModel.find(query)
                    .populate("userId propertyId")
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .sort({ updatedAt: -1 });
                return conversations;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    FindConversationListCount(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterQuery = { adminId };
            const totalConversations = yield ConversationModel_1.ConversationModel.countDocuments(filterQuery);
            return totalConversations;
        });
    }
    FindAdminsCallListByAdminId(adminId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = 10;
            const calles = yield CallModel_1.CallModel.find({ adminId: adminId }).skip((page - 1) * limit)
                .limit(limit)
                .populate("userId")
                .sort({ createdAt: -1 });
            return calles;
        });
    }
    FindTotalCountOftheCallList(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield CallModel_1.CallModel.find({ adminId: adminId }).countDocuments();
            return count;
        });
    }
    FindUsersListByAdminId(adminId, startDate, endDate, propertyName, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (propertyName === "All" || userType === "All") {
                const users = yield User_1.UserModel.find({
                    adminId: adminId,
                    updatedAt: -1,
                    deleted: false,
                }).populate("propId");
                return users;
            }
            const filter = {
                adminId: adminId,
                deleted: false,
            };
            if (startDate) {
                filter.createdAt = { $gte: new Date(startDate) };
            }
            if (endDate) {
                filter.createdAt = Object.assign(Object.assign({}, filter.createdAt), { $lte: new Date(endDate) });
            }
            if (propertyName) {
                filter.propId = propertyName;
            }
            if (userType) {
                const properties = yield QrDataModel_1.QrModel.find({ userType });
                const propertyIds = properties.map((property) => property._id);
                filter.propId = { $in: propertyIds };
            }
            const users = yield User_1.UserModel.find(filter).populate("propId");
            if (users.length > 0) {
                return users;
            }
            else {
                return "Empty list";
            }
        });
    }
    FindAndEditUnknownUser(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const editedUserdata = yield User_1.UserModel.findOneAndUpdate({ _id: userId }, {
                $set: {
                    username: username,
                },
            }, { new: true });
            if (editedUserdata) {
                return editedUserdata;
            }
            else {
                return "";
            }
        });
    }
    FindAndClearAdminChatMessages(conId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield MessageModel_1.MessageModel.updateMany({ conversationId: conId }, { $set: { adminDeleted: true } });
            return result;
        });
    }
    CreateAdminNewMessageToDb(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message);
            console.log("😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂❤️❤️❤️❤️❤️Admin send message an dsave to db");
            const newMessage = new MessageModel_1.MessageModel(message);
            const save = yield newMessage.save();
            return save;
        });
    }
    FindUserStaticsDataOfAdminById(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterUnknown = {
                adminId: adminId,
            };
            const filterVerified = {
                adminId: adminId,
            };
            const filterUnVerified = {
                adminId: adminId,
            };
            const verifiedProperties = yield QrDataModel_1.QrModel.find({ userType: "Verified" });
            const verifiedPropertyIds = verifiedProperties.map((property) => property._id);
            filterVerified.propId = { $in: verifiedPropertyIds };
            const unknonProperties = yield QrDataModel_1.QrModel.find({ userType: "Unknown" });
            const unknownPropertyIds = unknonProperties.map((property) => property._id);
            filterUnknown.propId = { $in: unknownPropertyIds };
            const unverifiedProperties = yield QrDataModel_1.QrModel.find({ userType: "Unverified" });
            const unverifiedPropertyIds = unverifiedProperties.map((property) => property._id);
            filterUnVerified.propId = { $in: unverifiedPropertyIds };
            const All = yield User_1.UserModel.find({
                adminId: adminId,
            }).countDocuments();
            const unknown = yield User_1.UserModel.find(filterVerified).countDocuments();
            const verified = yield User_1.UserModel.find(filterUnknown).countDocuments();
            const unVerified = yield User_1.UserModel.find(filterUnVerified).countDocuments();
            return { All, unknown, verified, unVerified };
        });
    }
    FindUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ _id: userId });
        });
    }
    FindUserByIdAndDelete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield User_1.UserModel.findOneAndUpdate({ _id: userId }, {
                $set: {
                    deleted: true,
                },
            }, { new: true });
            return deleted ? "Deleted" : "Failed";
        });
    }
    FindConversationByIdAndDelete(conId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield ConversationModel_1.ConversationModel.findOneAndUpdate({ _id: conId }, {
                deleted: true,
            }, { new: true });
            return deleted ? "Deleted" : "Failed";
        });
    }
    FindAllAdminMessages(conId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield MessageModel_1.MessageModel.find({
                conversationId: conId,
                adminDeleted: false,
            }).sort({ createdAt: 1 });
            return messages;
        });
    }
    CreateAdminCallToDb(callData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CallModel_1.CallModel.create(callData);
        });
    }
    AcceptAdminCallAndUpdatOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, {
                callStarted: Date.now(),
                callStatus: "answered",
            }, { new: true });
            return update;
        });
    }
    DisconnectAdminCallAndUpdateOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = yield CallModel_1.CallModel.findById(id);
            const callEnded = new Date();
            const callStarted = (call === null || call === void 0 ? void 0 : call.callStarted)
                ? new Date(call.callStarted).getTime()
                : 0;
            const callDuration = callStarted ? callEnded.getTime() - callStarted : 0;
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, {
                callEnded: callEnded,
                callDuration: callDuration,
            }, { new: true });
            return update;
        });
    }
    DeclineAdminCallAndUpdateOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = yield CallModel_1.CallModel.findById(id);
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, { callStatus: "declined" }, { new: true });
            return update;
        });
    }
    FindPropertyByIdAndDelete(propId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedQr = yield QrDataModel_1.QrModel.findOneAndUpdate({ _id: propId }, {
                deleted: true
            });
            return deletedQr;
        });
    }
}
exports.MongoAdminRepository = MongoAdminRepository;
