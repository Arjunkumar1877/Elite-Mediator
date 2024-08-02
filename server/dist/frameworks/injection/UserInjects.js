"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedUserCallingFunctionalitiesController = exports.InjectedGetUserMessagesController = exports.InjectedSendAndCreateUserMessageController = exports.InjectedCreateConversationController = exports.InjectedGetAdminsPropertdataController = exports.InjectedGetUserDataByPhoneController = exports.InjectedAddUserFcmCodeController = exports.InjectedVerifyAndUpdateUserDataController = exports.InjectedGetUnverifiedUserDataController = exports.InjectedChekAndSaveUnknwnUserController = exports.InjectedUpdatePropertyScannedCountController = exports.InjectedCheckAndSaveUnVerifiedUsersController = exports.InjectedCheckAndSaveVerifiedUsersController = exports.InjectedCreateNewUserDataController = void 0;
const AddUserFcmTokenController_1 = require("../../interfaceAdapters/controllers/user/AddUserFcmTokenController");
const CheckAndSaveUnknownUserController_1 = require("../../interfaceAdapters/controllers/user/CheckAndSaveUnknownUserController");
const CheckAndSaveUnverifiedUserController_1 = require("../../interfaceAdapters/controllers/user/CheckAndSaveUnverifiedUserController");
const CheckAndSaveVerifiedUserController_1 = require("../../interfaceAdapters/controllers/user/CheckAndSaveVerifiedUserController");
const CreateConversationController_1 = require("../../interfaceAdapters/controllers/user/CreateConversationController");
const CreateUserController_1 = require("../../interfaceAdapters/controllers/user/CreateUserController");
const GetAdminsPropertyDataController_1 = require("../../interfaceAdapters/controllers/user/GetAdminsPropertyDataController");
const GetUserDataByIdController_1 = require("../../interfaceAdapters/controllers/user/GetUserDataByIdController");
const GetUserDataByPhoneController_1 = require("../../interfaceAdapters/controllers/user/GetUserDataByPhoneController");
const GetUserMessagesController_1 = require("../../interfaceAdapters/controllers/user/GetUserMessagesController");
const SendUserMessageController_1 = require("../../interfaceAdapters/controllers/user/SendUserMessageController");
const UpdatePropertDataSacnnedCountController_1 = require("../../interfaceAdapters/controllers/user/UpdatePropertDataSacnnedCountController");
const UserCallingFunctionalitiesController_1 = require("../../interfaceAdapters/controllers/user/UserCallingFunctionalitiesController");
const userVerifyAndUpdateController_1 = require("../../interfaceAdapters/controllers/user/userVerifyAndUpdateController");
const UserRepository_1 = require("../../interfaceAdapters/repositories/user/UserRepository");
const AddUserFcmTokenUseCase_1 = require("../../useCases/user/AddUserFcmTokenUseCase");
const CheckAndSaveUnknownUserUseCase_1 = require("../../useCases/user/CheckAndSaveUnknownUserUseCase");
const CheckAndSaveUnverifiedUserUsecase_1 = require("../../useCases/user/CheckAndSaveUnverifiedUserUsecase");
const CheckAndSaveVerifiedUserUseCase_1 = require("../../useCases/user/CheckAndSaveVerifiedUserUseCase");
const CheckExisitingUserUseCase_1 = require("../../useCases/user/CheckExisitingUserUseCase");
const CreateConversationUseCase_1 = require("../../useCases/user/CreateConversationUseCase");
const GetAdminsPropertDataUseCase_1 = require("../../useCases/user/GetAdminsPropertDataUseCase");
const GetUserDataByIdUseCase_1 = require("../../useCases/user/GetUserDataByIdUseCase");
const GetUserDataByPhoneUseCase_1 = require("../../useCases/user/GetUserDataByPhoneUseCase");
const GetUserMessagesUseCase_1 = require("../../useCases/user/GetUserMessagesUseCase");
const SaveNewUserDataUseCase_1 = require("../../useCases/user/SaveNewUserDataUseCase");
const SendAndCreateUserMessage_1 = require("../../useCases/user/SendAndCreateUserMessage");
const UpdatePropertyScannedCountUseCase_1 = require("../../useCases/user/UpdatePropertyScannedCountUseCase");
const UserCallingFunctionalitiesUseCase_1 = require("../../useCases/user/UserCallingFunctionalitiesUseCase");
const VerifyUserUseCase_1 = require("../../useCases/user/VerifyUserUseCase");
const mongoRepo = new UserRepository_1.MongoUserRepository();
// -----------------------------| NEW USER LOGIN AND SAVE DATA INJECTION ----------------------------------------------------------------------------------------
const saveUserUse = new SaveNewUserDataUseCase_1.SaveNewUserDataUseCase(mongoRepo);
const checkUserDataUse = new CheckExisitingUserUseCase_1.CheckExisitingUserUseCase(mongoRepo);
exports.InjectedCreateNewUserDataController = new CreateUserController_1.CreateUserController(saveUserUse, checkUserDataUse);
// -----------------------------| CHECK AND SAVE VERIFIED USER DATA INJECTION ----------------------------------------------------------------------------------------
const checkAndSaveVerifiedUserDataUse = new CheckAndSaveVerifiedUserUseCase_1.CheckAndSaveVerifiedUseUseCase(mongoRepo);
exports.InjectedCheckAndSaveVerifiedUsersController = new CheckAndSaveVerifiedUserController_1.CheckAndSaveVerifiedUserController(checkAndSaveVerifiedUserDataUse);
// -----------------------------| CHECK AND SAVE UNVERIFIED USER DATA INJECTION ----------------------------------------------------------------------------------------
const checkAndSaveUnVerifiedUserDataUse = new CheckAndSaveUnverifiedUserUsecase_1.CheckAndSaveUnverifiedUserUsecase(mongoRepo);
exports.InjectedCheckAndSaveUnVerifiedUsersController = new CheckAndSaveUnverifiedUserController_1.CheckAndSaveUnverifiedUserController(checkAndSaveUnVerifiedUserDataUse);
// -----------------------------| CHECK AND SAVE UNVERIFIED USER DATA INJECTION ----------------------------------------------------------------------------------------
const updatePropertSacnnedUse = new UpdatePropertyScannedCountUseCase_1.UpdatePropertyScannedCountUseCase(mongoRepo);
exports.InjectedUpdatePropertyScannedCountController = new UpdatePropertDataSacnnedCountController_1.UpdatePropertDataSacnnedCountController(updatePropertSacnnedUse);
// -----------------------------| NEW USER LOGIN AND SAVE DATA INJECTION ----------------------------------------------------------------------------------------
const checkAndSaveUnknownUserUse = new CheckAndSaveUnknownUserUseCase_1.CheckAndSaveUnknownUserUseCase(mongoRepo);
exports.InjectedChekAndSaveUnknwnUserController = new CheckAndSaveUnknownUserController_1.CheckAndSaveUnknownUserController(checkAndSaveUnknownUserUse);
// -----------------------------| GET UNVERIFIED USER DATA BY ID INJECTION ----------------------------------------------------------------------------------------
const getUserDataByIdUse = new GetUserDataByIdUseCase_1.GetUserDataByIdUseCase(mongoRepo);
exports.InjectedGetUnverifiedUserDataController = new GetUserDataByIdController_1.GetUserDataByIdController(getUserDataByIdUse);
// -----------------------------| VERIFY AND UPDATE USER DATA INJECTION ----------------------------------------------------------------------------------------
const VerifyUserDataUse = new VerifyUserUseCase_1.VerifyUserUseCase(mongoRepo);
exports.InjectedVerifyAndUpdateUserDataController = new userVerifyAndUpdateController_1.VerifyAndUpdateUserController(VerifyUserDataUse);
// -----------------------------| ADD FCM TOKEN TO USER DB FOR PUSH NOTIFICATION  ----------------------------------------------------------------------------------------
const AddUserNewFcmTokenOrGetExsistingOneUse = new AddUserFcmTokenUseCase_1.AddUserFcmTokenUseCase(mongoRepo);
exports.InjectedAddUserFcmCodeController = new AddUserFcmTokenController_1.AddUserFcmTokenController(AddUserNewFcmTokenOrGetExsistingOneUse);
// -----------------------------| GET USER DATA BY PHONE INJECTION ----------------------------------------------------------------------------------------
const getUserDataByPhoneUse = new GetUserDataByPhoneUseCase_1.GetUserDataByPhoneUseCase(mongoRepo);
exports.InjectedGetUserDataByPhoneController = new GetUserDataByPhoneController_1.GetUserDataByPhoneController(getUserDataByPhoneUse);
// -----------------------------| GET ADMINS PROPERTY DATA BY PROPID AND ADMINID  INJECTION ----------------------------------------------------------------------------------------
const getAdminsPropertyDataUse = new GetAdminsPropertDataUseCase_1.GetAdminsPropertDataUseCase(mongoRepo);
exports.InjectedGetAdminsPropertdataController = new GetAdminsPropertyDataController_1.GetAdminsPropertyDataController(getAdminsPropertyDataUse);
// -----------------------------| CHECK AND SEND CONVERSATION AND USER OR CREATE NEW CONVERSATION AND UPDATE USER WITH CONVERSATION ID INJECTION ----------------------------------------------------------------------------------------
const createConversationUse = new CreateConversationUseCase_1.CreateConversationUseCase(mongoRepo);
exports.InjectedCreateConversationController = new CreateConversationController_1.CreateConversationController(createConversationUse, getUserDataByIdUse);
// -----------------------------| SEND MESSAGES FROM USER CHAT  ----------------------------------------------------------------------------------------
const SendUserMessageUse = new SendAndCreateUserMessage_1.SendAndCreateUserMessageUseCase(mongoRepo);
exports.InjectedSendAndCreateUserMessageController = new SendUserMessageController_1.SendUserMessageController(SendUserMessageUse);
// -----------------------------| GET ALL MESSAGES FOR THE USER CHAT  ----------------------------------------------------------------------------------------
const getUserMessagesUse = new GetUserMessagesUseCase_1.GetUserMessagesUseCase(mongoRepo);
exports.InjectedGetUserMessagesController = new GetUserMessagesController_1.GetUserMessagesController(getUserMessagesUse);
// -----------------------------| CALLING FUNCTIONALITIES FROM THE USER TO THE ADMIN  ----------------------------------------------------------------------------------------
const usercallfunctionalitiesUse = new UserCallingFunctionalitiesUseCase_1.UserCallingFunctionalitiesUseCase(mongoRepo);
exports.InjectedUserCallingFunctionalitiesController = new UserCallingFunctionalitiesController_1.UserCallingFunctionalitiesController(usercallfunctionalitiesUse);
