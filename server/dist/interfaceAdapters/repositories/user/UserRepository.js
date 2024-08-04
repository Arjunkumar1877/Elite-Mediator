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
exports.MongoUserRepository = void 0;
const CallModel_1 = require("../../../frameworks/database/models/admin/CallModel");
const ConversationModel_1 = require("../../../frameworks/database/models/admin/ConversationModel");
const MessageModel_1 = require("../../../frameworks/database/models/admin/MessageModel");
const QrDataModel_1 = require("../../../frameworks/database/models/admin/QrDataModel");
const User_1 = require("../../../frameworks/database/models/user/User");
class MongoUserRepository {
    CreateNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.create(user);
        });
    }
    FindUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield User_1.UserModel.findOne({ _id: userId }).populate('adminId');
            return data;
        });
    }
    FindByIdAndVerify(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedData = yield User_1.UserModel.findOneAndUpdate({ _id: userId }, {
                $set: {
                    verified: true,
                },
            });
            console.log('😣😣😣🔥🔥🔥🔥📀📀📀📀 user verification');
            if (savedData) {
                return savedData;
            }
            else {
                return "User data unavailable";
            }
        });
    }
    FindUserByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ phone: phone });
        });
    }
    FindByPhoneAndPropId(phone, propId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ phone, propId }).populate('adminId');
        });
    }
    FindByPhoneAndPropIdAndDelete(phone, propId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOneAndDelete({ phone, propId });
        });
    }
    FindPropertyData(propId, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield QrDataModel_1.QrModel.findOne({ adminId: adminId, propId: propId });
            return data;
        });
    }
    FindPropertyDataBypropIdAndAddScanCount(propId) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyData = yield QrDataModel_1.QrModel.findOne({ propId: propId });
            if (propertyData) {
                const updateProperty = yield QrDataModel_1.QrModel.findOneAndUpdate({ propId: propId }, { $inc: { scannedCount: 1 } }, { new: true });
                if (updateProperty) {
                    return "success";
                }
            }
            return "failed";
        });
    }
    CreateConversation(userId, adminId, propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const save = yield ConversationModel_1.ConversationModel.create({
                userId,
                adminId,
                propertyId,
            });
            if (save) {
                const userFindUser = yield User_1.UserModel.findOneAndUpdate({ _id: userId }, {
                    $set: {
                        conversationId: save._id,
                    },
                }, { new: true });
                if (userFindUser) {
                    console.log("user updated with conversation ID");
                }
            }
            return save;
        });
    }
    FindConversation(userId, adminId, propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ConversationModel_1.ConversationModel.findOne({ userId, adminId, propertyId });
        });
    }
    FindUserByMacId(macId, propId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ macId: macId, propId: propId }).populate('adminId');
        });
    }
    FindUserByIdPopulateAdminData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ _id: userId }).populate('adminId propId');
        });
    }
    FindAndGetUserMessages(conId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.MessageModel.find({ conversationId: conId, userDeleted: false });
        });
    }
    CreateUserNewMessageToDb(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(message )
            // console.log("😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️")
            const newMessage = new MessageModel_1.MessageModel(message);
            const save = yield newMessage.save();
            return save;
        });
    }
    FindUserAndAddFcmToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOneAndUpdate({ _id: userId }, {
                $set: {
                    fcmToken: token
                }
            }, { new: true });
        });
    }
    FindUserFcmToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ _id: userId, fcmToken: token }).populate("adminId propId");
        });
    }
    FindTheUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findOne({ _id: userId });
        });
    }
    FindConversationAndUpdateDeleted(conId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedConversation = yield ConversationModel_1.ConversationModel.findOneAndUpdate({ _id: conId }, {
                $set: {
                    deleted: false
                }
            }, { new: true });
            if (updatedConversation) {
                return 'updated';
            }
            else {
                return 'failed';
            }
        });
    }
    FindUserAndUpdateDeletedUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield User_1.UserModel.findOneAndUpdate({ _id: userId }, {
                $set: {
                    deleted: false
                }
            }, { new: true });
            if (updateUser) {
                return 'updated';
            }
            else {
                return 'failed';
            }
        });
    }
    CreateUserCallToDb(callData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CallModel_1.CallModel.create(callData);
        });
    }
    AcceptUserCallAndUpdatOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, {
                callStarted: Date.now(),
                callStatus: "answered",
            }, { new: true });
            return update;
        });
    }
    DisconnectUserCallAndUpdateOnDb(id) {
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
    DeclineUserCallAndUpdateOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = yield CallModel_1.CallModel.findById(id);
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, { callStatus: "declined" }, { new: true });
            return update;
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
