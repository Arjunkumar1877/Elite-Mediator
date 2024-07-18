"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedGetMessagesController = exports.InjectedSendMesssage = void 0;
const GetMessagesController_1 = require("../../interfaceAdapters/controllers/common/GetMessagesController");
const SendMessageController_1 = require("../../interfaceAdapters/controllers/common/SendMessageController");
const CommonReopsitory_1 = require("../../interfaceAdapters/repositories/common/CommonReopsitory");
const GetMessagesUseCase_1 = require("../../useCases/common/GetMessagesUseCase");
const SendMessageUseCase_1 = require("../../useCases/common/SendMessageUseCase");
// import { io } from "../services/socketIo/SocketIo";
const commonRepo = new CommonReopsitory_1.MongoCommonRepository();
// -----------------------------| SEND MESSAGE BY ADMIN AND USER INJECTION ----------------------------------------------------------------------------------------
const sendMessageUse = new SendMessageUseCase_1.SendMessageUseCase(commonRepo);
exports.InjectedSendMesssage = new SendMessageController_1.SendMessageController(sendMessageUse);
// -----------------------------| GET MESSAGES AND CONVERSATION DATA FOR BOTH USER AND ADMIN INJECTION ----------------------------------------------------------------------------------------
const getMessageUse = new GetMessagesUseCase_1.GetMessagesUseCase(commonRepo);
exports.InjectedGetMessagesController = new GetMessagesController_1.GetMessagesController(getMessageUse);
