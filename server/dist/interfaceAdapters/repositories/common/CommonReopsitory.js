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
exports.MongoCommonRepository = void 0;
const CallModel_1 = require("../../../frameworks/database/models/admin/CallModel");
const ConversationModel_1 = require("../../../frameworks/database/models/admin/ConversationModel");
const MessageModel_1 = require("../../../frameworks/database/models/admin/MessageModel");
class MongoCommonRepository {
    CreateNewMessageToDb(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message);
            console.log("😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️");
            const newMessage = new MessageModel_1.MessageModel(message.messageData);
            const save = yield newMessage.save();
            return save;
        });
    }
    GetConversationFromDb(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield ConversationModel_1.ConversationModel.findOne({
                _id: conversationId,
            });
            return conversation;
        });
    }
    GetMessagesFromDb(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("😣😣😣😣🔥🔥🔥🔥🔥 fetching messages in repository data");
            const messages = yield MessageModel_1.MessageModel.find({
                conversationId: conversationId,
                adminDeleted: false,
            }).sort({ createdAt: 1 });
            // console.log(messages);
            return messages;
        });
    }
    CreateACallToDb(callData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CallModel_1.CallModel.create(callData);
        });
    }
    AcceptCallAndUpdatOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, {
                callStarted: Date.now(),
                callStatus: "answered",
            }, { new: true });
            return update;
        });
    }
    DisconnectCallAndUpdateOnDb(id) {
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
    DeclineCallAndUpdateOnDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = yield CallModel_1.CallModel.findById(id);
            const update = yield CallModel_1.CallModel.findByIdAndUpdate(id, { callStatus: "declined" }, { new: true });
            return update;
        });
    }
}
exports.MongoCommonRepository = MongoCommonRepository;
