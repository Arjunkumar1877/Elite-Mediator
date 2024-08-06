"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedAdminCallFunctionalitiesController = exports.InjectedDeleteUserDataAndConversationController = exports.InjectedUserStatisticsGraphController = exports.InjectedSendAdminMessageController = exports.InjectedAddNewFcmTokenOrGetExsistingeController = exports.InjectedEditUnknownUsernameController = exports.InjectedClearAdminChatMessagesController = exports.InjectedGetAdminMessagessController = exports.InjectedGetUsersListController = exports.InjectedGetAdminsCallListController = exports.InjectedGetConversationListController = exports.InjectedGetSelectedConversationController = exports.InjectedDeleteAdminPropertDataController = exports.InjectedUpdateConversationReadCountToZeroController = exports.InjectedGetAdminPropertyDataForFilteringController = exports.InjectedGetAdminAllPropertyDataController = exports.InjectedSavePropertyDataController = exports.InjectedGenerateQrCodeController = exports.InjectedGetAdminDataController = exports.InjectedUpdateAdminProfileController = exports.InjectedAdminlogincontroller = exports.InjectedUpdateVerifyAdminController = exports.InjectedGoogleLoginController = exports.InjectedGetUnverifiedAdminController = exports.InjectedSenEmailOtpAndUpdateController = exports.InjectedAdminSignUpController = void 0;
const AdminLoginController_1 = require("../../interfaceAdapters/controllers/Admin/AdminLoginController");
const GenerateQrCodeController_1 = require("../../interfaceAdapters/controllers/Admin/GenerateQrCodeController");
const GetAdminDataController_1 = require("../../interfaceAdapters/controllers/Admin/GetAdminDataController");
const GetAdminAllPropertyDataController_1 = require("../../interfaceAdapters/controllers/Admin/GetAdminAllPropertyDataController");
const GetUnverifiedAdminController_1 = require("../../interfaceAdapters/controllers/Admin/GetUnverifiedAdminController");
const GoogleOAuthController_1 = require("../../interfaceAdapters/controllers/Admin/GoogleOAuthController");
const SavePropertyDataController_1 = require("../../interfaceAdapters/controllers/Admin/SavePropertyDataController");
const SignUpController_1 = require("../../interfaceAdapters/controllers/Admin/SignUpController");
const UpdateAdminProfileController_1 = require("../../interfaceAdapters/controllers/Admin/UpdateAdminProfileController");
const UpdateUnverifiedAdminController_1 = require("../../interfaceAdapters/controllers/Admin/UpdateUnverifiedAdminController");
const AdminRepository_1 = require("../../interfaceAdapters/repositories/admin/AdminRepository");
const AdminLoginUseCase_1 = require("../../useCases/admin/AdminLoginUseCase");
const AdminSignUseCase_1 = require("../../useCases/admin/AdminSignUseCase");
const GetAdminDataUseCase_1 = require("../../useCases/admin/GetAdminDataUseCase");
const GetAdminAllPropertyDataUseCase_1 = require("../../useCases/admin/GetAdminAllPropertyDataUseCase");
const GetUnverifiedAdminUseCase_1 = require("../../useCases/admin/GetUnverifiedAdminUseCase");
const GoogleAuthUseCase_1 = require("../../useCases/admin/GoogleAuthUseCase");
const SavePropertyDataUseCase_1 = require("../../useCases/admin/SavePropertyDataUseCase");
const UpdateAdminUseCase_1 = require("../../useCases/admin/UpdateAdminUseCase");
const UpdateUnverifiedUserUseCase_1 = require("../../useCases/admin/UpdateUnverifiedUserUseCase");
const GenerateQrCode_1 = require("../services/QrGenerateService/GenerateQrCode.");
const UpdateConversationReadToZeroController_1 = require("../../interfaceAdapters/controllers/Admin/UpdateConversationReadToZeroController");
const UpdateConversationReadCountToZeroUseCase_1 = require("../../useCases/admin/UpdateConversationReadCountToZeroUseCase");
const GetSelectedConversationUseCase_1 = require("../../useCases/admin/GetSelectedConversationUseCase");
const GetSelectedConversationController_1 = require("../../interfaceAdapters/controllers/Admin/GetSelectedConversationController");
const GetConversationListUseCase_1 = require("../../useCases/admin/GetConversationListUseCase");
const GetAdminConversationListController_1 = require("../../interfaceAdapters/controllers/Admin/GetAdminConversationListController");
const GetAdminCallListUseCase_1 = require("../../useCases/admin/GetAdminCallListUseCase");
const GetAdminsCallListController_1 = require("../../interfaceAdapters/controllers/Admin/GetAdminsCallListController");
const GetUsersListUseCase_1 = require("../../useCases/admin/GetUsersListUseCase");
const GetUsersListController_1 = require("../../interfaceAdapters/controllers/Admin/GetUsersListController");
const ClearAdminChatUseCase_1 = require("../../useCases/admin/ClearAdminChatUseCase");
const ClearAdminChatMessagesController_1 = require("../../interfaceAdapters/controllers/Admin/ClearAdminChatMessagesController");
const EditUnknownUsernameUseCase_1 = require("../../useCases/admin/EditUnknownUsernameUseCase");
const EditUnknownUsername_1 = require("../../interfaceAdapters/controllers/Admin/EditUnknownUsername");
const AddAdminFcmTokenUseCase_1 = require("../../useCases/admin/AddAdminFcmTokenUseCase");
const AddAdminFcmTokenController_1 = require("../../interfaceAdapters/controllers/Admin/AddAdminFcmTokenController");
const SendAndCreateAdminMessageUseCase_1 = require("../../useCases/admin/SendAndCreateAdminMessageUseCase");
const SendAdminMessageController_1 = require("../../interfaceAdapters/controllers/Admin/SendAdminMessageController");
const UserStatisticsGraphDataUseCase_1 = require("../../useCases/admin/UserStatisticsGraphDataUseCase");
const GetUserStatisticsGraphDataController_1 = require("../../interfaceAdapters/controllers/Admin/GetUserStatisticsGraphDataController");
const GetAdminPropertDataForFilteringController_1 = require("../../interfaceAdapters/controllers/Admin/GetAdminPropertDataForFilteringController");
const GetAdminPropertyDataForFilterUseCase_1 = require("../../useCases/admin/GetAdminPropertyDataForFilterUseCase");
const DeleteUserDataUseCase_1 = require("../../useCases/admin/DeleteUserDataUseCase");
const DeleteUserDataAndConversationController_1 = require("../../interfaceAdapters/controllers/Admin/DeleteUserDataAndConversationController");
const AdminCallingFunctionalitesUseCase_1 = require("../../useCases/admin/AdminCallingFunctionalitesUseCase");
const AdminCallingFunctionalitiesController_1 = require("../../interfaceAdapters/controllers/Admin/AdminCallingFunctionalitiesController");
const GetAdminMessagesUseCase_1 = require("../../useCases/admin/GetAdminMessagesUseCase");
const GetAdminMessagesController_1 = require("../../interfaceAdapters/controllers/Admin/GetAdminMessagesController");
const DeleteAdminPropertyUseCase_1 = require("../../useCases/admin/DeleteAdminPropertyUseCase");
const DeleteAdminPropertyController_1 = require("../../interfaceAdapters/controllers/Admin/DeleteAdminPropertyController");
const AdminSendEmailOtpAndUpdateUseCase_1 = require("../../useCases/admin/AdminSendEmailOtpAndUpdateUseCase");
const AdminSendAndsendAndUpdateEmailOtpController_1 = require("../../interfaceAdapters/controllers/Admin/AdminSendAndsendAndUpdateEmailOtpController");
const mongoRepo = new AdminRepository_1.MongoAdminRepository();
// -----------------------------| ADMIN SIGNUP INJECTION ----------------------------------------------------------------------------------------
const adminSignupUse = new AdminSignUseCase_1.AdminSignupUseCase(mongoRepo);
exports.InjectedAdminSignUpController = new SignUpController_1.AdminSignupController(adminSignupUse);
// -----------------------------| SEND EMAIL OTP AND UPDATE INTO THE DATABASE INJECTION ----------------------------------------------------------------------------------------
const sendEmailOtpAndUpdateUse = new AdminSendEmailOtpAndUpdateUseCase_1.AdminSendEmailOtpAndUpdateUseCase(mongoRepo);
exports.InjectedSenEmailOtpAndUpdateController = new AdminSendAndsendAndUpdateEmailOtpController_1.AdminSendAndUpdateEmailOtpController(sendEmailOtpAndUpdateUse);
// -----------------------------| ADMIN LOGIN VERIFY INJECTION ----------------------------------------------------------------------------------------
const getUnverifiedAdminUse = new GetUnverifiedAdminUseCase_1.GetUnverifiedAdminDataUsecase(mongoRepo);
exports.InjectedGetUnverifiedAdminController = new GetUnverifiedAdminController_1.GetUnverifiedAdminController(getUnverifiedAdminUse);
// -----------------------------| ADMIN LOGIN VERIFY INJECTION ----------------------------------------------------------------------------------------
const adminGoogleLoginUse = new GoogleAuthUseCase_1.GoogleAuthUseCase(mongoRepo);
exports.InjectedGoogleLoginController = new GoogleOAuthController_1.GoogleOAthController(adminGoogleLoginUse);
// -----------------------------| VERIFY AND UPDATE ADMIN BY FIRBASE BASE CODE INJECTION ----------------------------------------------------------------------------------------
const updateVerifyAdminUse = new UpdateUnverifiedUserUseCase_1.UpdateUnverifiedUseCase(mongoRepo);
exports.InjectedUpdateVerifyAdminController = new UpdateUnverifiedAdminController_1.UpdateUnverifiedAdminController(updateVerifyAdminUse);
// -----------------------------| ADMIN LOGIN VERIFY INJECTION ----------------------------------------------------------------------------------------
const adminLoginUse = new AdminLoginUseCase_1.AdminLoginUseCase(mongoRepo);
exports.InjectedAdminlogincontroller = new AdminLoginController_1.AdminLoginController(adminLoginUse);
// -----------------------------| UPDATE ADMIN PROFILE DETAILS INJECTION ----------------------------------------------------------------------------------------
const adminProfileUpdateUse = new UpdateAdminUseCase_1.UpdateAdminProfileUseCase(mongoRepo);
exports.InjectedUpdateAdminProfileController = new UpdateAdminProfileController_1.UpdateAdminProfileController(adminProfileUpdateUse);
// -----------------------------|GET ADMIN PROFILE DETAILS INJECTION ----------------------------------------------------------------------------------------
const getAdminDataByIdUse = new GetAdminDataUseCase_1.GetAdminDataUseCase(mongoRepo);
exports.InjectedGetAdminDataController = new GetAdminDataController_1.GetAdminDataController(getAdminDataByIdUse);
// -----------------------------| GENERATE AND SEND QRCODE TO THE CLIENT INJECTION ----------------------------------------------------------------------------------------
const generateQrCodeUse = new GenerateQrCode_1.GenerateQrCode();
exports.InjectedGenerateQrCodeController = new GenerateQrCodeController_1.GenerateQrController(generateQrCodeUse);
// -----------------------------| GENERATE AND SEND QRCODE TO THE CLIENT INJECTION ----------------------------------------------------------------------------------------
const savePropertyDataUse = new SavePropertyDataUseCase_1.SavePropertyDataUseCase(mongoRepo);
exports.InjectedSavePropertyDataController = new SavePropertyDataController_1.SavePropertDataController(savePropertyDataUse);
// -----------------------------| GET EACH ADMIN'S PROPERTY DATA AND QRCODE'S INJECTION ----------------------------------------------------------------------------------------
const getAdminPropertyDataUse = new GetAdminAllPropertyDataUseCase_1.GetAdminAllPropertDataUseCase(mongoRepo);
exports.InjectedGetAdminAllPropertyDataController = new GetAdminAllPropertyDataController_1.GetAdminAllPropertyDataController(getAdminPropertyDataUse);
// -----------------------------| GET EACH ADMIN'S PROPERTY DATA AND QRCODE'S INJECTION ----------------------------------------------------------------------------------------
const getAdminPropertyDataForFilterUse = new GetAdminPropertyDataForFilterUseCase_1.GetAdminPropertyDataForFilterUseCase(mongoRepo);
exports.InjectedGetAdminPropertyDataForFilteringController = new GetAdminPropertDataForFilteringController_1.GetAdminPropertDataForFilteringController(getAdminPropertyDataForFilterUse);
// -----------------------------| GET EACH ADMIN'S PROPERTY DATA AND QRCODE'S INJECTION ----------------------------------------------------------------------------------------
const updateConversationReadCountUse = new UpdateConversationReadCountToZeroUseCase_1.UpdateConversationReadCountToZeroUseCase(mongoRepo);
exports.InjectedUpdateConversationReadCountToZeroController = new UpdateConversationReadToZeroController_1.UpdateConversationReadToZeroController(updateConversationReadCountUse);
// -----------------------------| DELET ETHE CREATED ADMIN PROPERTY DATA WITH QR CODE MAKING A SOFT DELETE ----------------------------------------------------------------------------------------
const deletepropertyDataUse = new DeleteAdminPropertyUseCase_1.DeleteAdminPropertyUseCase(mongoRepo);
exports.InjectedDeleteAdminPropertDataController = new DeleteAdminPropertyController_1.DeleteAdminPropertyController(deletepropertyDataUse);
// -----------------------------| GET ADMIN'S SELECTED CONVERSATION INJECTION ----------------------------------------------------------------------------------------
const getSelectedConversationUse = new GetSelectedConversationUseCase_1.GetSelectedConversationUseCase(mongoRepo);
exports.InjectedGetSelectedConversationController = new GetSelectedConversationController_1.GetSelectedConversationController(getSelectedConversationUse);
// -----------------------------| GET ADMIN'S SELECTED CONVERSATION INJECTION ----------------------------------------------------------------------------------------
const getConversationListUse = new GetConversationListUseCase_1.GetConversationListUseCase(mongoRepo);
exports.InjectedGetConversationListController = new GetAdminConversationListController_1.GetAdminConversationListController(getConversationListUse);
// -----------------------------| GET ADMIN'S  CALL LIST INJECTION ----------------------------------------------------------------------------------------
const getAdminsCallListUse = new GetAdminCallListUseCase_1.GetAdminCallListUseCase(mongoRepo);
exports.InjectedGetAdminsCallListController = new GetAdminsCallListController_1.GetAdminsCallListController(getAdminsCallListUse);
// -----------------------------| GET VISITORS  LIST INJECTION ----------------------------------------------------------------------------------------
const getUsersListUse = new GetUsersListUseCase_1.GetUsersListUseCase(mongoRepo);
exports.InjectedGetUsersListController = new GetUsersListController_1.GetUsersListController(getUsersListUse);
// -----------------------------| GET ALL MESSAGES OF ADMIN  ----------------------------------------------------------------------------------------
const getAdminsmessagesUse = new GetAdminMessagesUseCase_1.GetAdminMessagesUseCase(mongoRepo);
exports.InjectedGetAdminMessagessController = new GetAdminMessagesController_1.GetAdminMessagesController(getAdminsmessagesUse);
// -----------------------------| CLEAR ADMIN CHAT MESSAGES ----------------------------------------------------------------------------------------
const clearAdminChatMessagesUse = new ClearAdminChatUseCase_1.ClearAdminChatUseCase(mongoRepo);
exports.InjectedClearAdminChatMessagesController = new ClearAdminChatMessagesController_1.ClearAdminChatMessagesController(clearAdminChatMessagesUse);
// -----------------------------| CLEAR ADMIN CHAT MESSAGES ----------------------------------------------------------------------------------------
const editUnknownUsernameUse = new EditUnknownUsernameUseCase_1.EditUnknownUsernameUseCase(mongoRepo);
exports.InjectedEditUnknownUsernameController = new EditUnknownUsername_1.EditUnknownUsername(editUnknownUsernameUse);
// -----------------------------| ADD A NEW FCM TOKEN OR GET THE EXSISTING ONE ----------------------------------------------------------------------------------------
const AddNewFcmTokenOrGetExsistingOneUse = new AddAdminFcmTokenUseCase_1.AddAdminFcmTokenUseCase(mongoRepo);
exports.InjectedAddNewFcmTokenOrGetExsistingeController = new AddAdminFcmTokenController_1.AddAdminFcmTokenController(AddNewFcmTokenOrGetExsistingOneUse);
// -----------------------------| ADD A NEW FCM TOKEN OR GET THE EXSISTING ONE ----------------------------------------------------------------------------------------
const sendAdminMessageUse = new SendAndCreateAdminMessageUseCase_1.SendAndCreateAdminMessageUseCase(mongoRepo);
exports.InjectedSendAdminMessageController = new SendAdminMessageController_1.SendAdminMessageController(sendAdminMessageUse);
// -----------------------------| GET USER DAT ASTATISTICS FOR THE ADMIN DASHBOARD ----------------------------------------------------------------------------------------
const userStatisticsDataUse = new UserStatisticsGraphDataUseCase_1.UserStatisticsGraphDataUseCase(mongoRepo);
exports.InjectedUserStatisticsGraphController = new GetUserStatisticsGraphDataController_1.GetUserStatisticsGraphDataController(userStatisticsDataUse);
// -----------------------------| GET USER DAT ASTATISTICS FOR THE ADMIN DASHBOARD ----------------------------------------------------------------------------------------
const deleteUserDataUse = new DeleteUserDataUseCase_1.DeleteUserDataUseCase(mongoRepo);
exports.InjectedDeleteUserDataAndConversationController = new DeleteUserDataAndConversationController_1.DeleteUserDataAndConversationController(deleteUserDataUse);
// -----------------------------| CALLING FUNCTIONALITIES FROM ADMIN TO THE USER ----------------------------------------------------------------------------------------
const adminCallFunctionalitiesUse = new AdminCallingFunctionalitesUseCase_1.AdminCallingFunctionalitesUseCase(mongoRepo);
exports.InjectedAdminCallFunctionalitiesController = new AdminCallingFunctionalitiesController_1.AdminCallingFunctionalitiesController(adminCallFunctionalitiesUse);
