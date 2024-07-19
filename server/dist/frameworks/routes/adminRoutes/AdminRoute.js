"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TokenService_1 = require("../../../frameworks/services/jwtService/TokenService");
const AdminInjects_1 = require("../../../frameworks/injection/AdminInjects");
const UserInjects_1 = require("../../../frameworks/injection/UserInjects");
const router = (0, express_1.Router)();
const JwtToken = new TokenService_1.JwtTokenAdapter();
// -------------------------------------| ADMIN SIGN UP-------------------------------------------------------------------------------------------------|
router.post("/signup", AdminInjects_1.InjectedAdminSignUpController.signUpAdmin.bind(AdminInjects_1.InjectedAdminSignUpController));
// -------------------------------------| GET THE UNVERIFIED ADMIN--------------------------------------------------------------------------------------|
router.get("/unverified_admin/:phone", AdminInjects_1.InjectedGetUnverifiedAdminController.getUnverifiedAdminController.bind(AdminInjects_1.InjectedGetUnverifiedAdminController));
// -------------------------------------| VERIFY THE ADMIN BY THE FIREBASE VERIFICATION ID -------------------------------------------------------------|
router.post("/update_firebase_verify", AdminInjects_1.InjectedUpdateVerifyAdminController.UpdateAdminVerifyController.bind(AdminInjects_1.InjectedUpdateVerifyAdminController));
// -------------------------------------| VERIFY THE ADMIN AND LOGIN -----------------------------------------------------------------------------------|
router.post("/admin_login", JwtToken.CreateJwtToken, AdminInjects_1.InjectedAdminlogincontroller.login.bind(AdminInjects_1.InjectedAdminlogincontroller));
// -------------------------------------| GOOGLE AUTHENTICATION ----------------------------------------------------------------------------------------|
router.post("/google_oauth", JwtToken.CreateJwtToken, AdminInjects_1.InjectedGoogleLoginController.GoogleoauthController.bind(AdminInjects_1.InjectedGoogleLoginController));
// -------------------------------------| UPDATE THE ADDMIN PROFILE ------------------------------------------------------------------------------------|
router.post("/update_admin/:id", JwtToken.verifyToken, AdminInjects_1.InjectedUpdateAdminProfileController.UpdateAdminProfileData.bind(AdminInjects_1.InjectedUpdateAdminProfileController));
// -------------------------------------| ADD A NEW FCM TOKEN TO ADMIN OR GET THE ADMIN WITH THE EXSISTING FCM TOKEN   -----------------------------------------------------------------------------------|
router.post('/admin_add_or_get_fcmtoken', AdminInjects_1.InjectedAddNewFcmTokenOrGetExsistingeController.AddAdminFcmTokenControl.bind(AdminInjects_1.InjectedAddNewFcmTokenOrGetExsistingeController));
// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID ---------------------------------------------------------------------------|
router.get("/get_admin/:id", JwtToken.verifyToken, AdminInjects_1.InjectedGetAdminDataController.GetAdminDataByIdController.bind(AdminInjects_1.InjectedGetAdminDataController));
// -------------------------------------| GET THE USER STATISTIC GRAPH DATA FOR THE ADMIN DASHBOARD   -----------------------------------------------------------------------------------|
router.get("/admin_dash_graph/:adminId", AdminInjects_1.InjectedUserStatisticsGraphController.GetUserStatisticsGraphDataControl.bind(AdminInjects_1.InjectedUserStatisticsGraphController));
// -------------------------------------| GET THE GENRATED ADMIN CODE ----------------------------------------------------------------------------------|
router.get("/generate_code/:adminId/:propertyId", JwtToken.verifyToken, AdminInjects_1.InjectedGenerateQrCodeController.GenerateQrCode.bind(AdminInjects_1.InjectedGenerateQrCodeController));
// -------------------------------------| SAVE PROPERTY DATA AND QRCODE --------------------------------------------------------------------------------|
router.post("/save_property_data", JwtToken.verifyToken, AdminInjects_1.InjectedSavePropertyDataController.SavePropertyDataControl.bind(AdminInjects_1.InjectedSavePropertyDataController));
// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------------|
router.get("/get_admin_property_data/:id", JwtToken.verifyToken, AdminInjects_1.InjectedGetAdminAllPropertyDataController.GetAdminPropertyDataControl.bind(AdminInjects_1.InjectedGetAdminAllPropertyDataController));
// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------------|
router.get("/get_admin_property_data_filtering/:adminId", JwtToken.verifyToken, AdminInjects_1.InjectedGetAdminPropertyDataForFilteringController.GetAdminPropertyDataForFilteringControl.bind(AdminInjects_1.InjectedGetAdminPropertyDataForFilteringController));
router.get('/admin_delete_user_data/:userId', AdminInjects_1.InjectedDeleteUserDataAndConversationController.DeleteUserDataConversatiionControl.bind(AdminInjects_1.InjectedDeleteUserDataAndConversationController));
// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER -------------------------------------------------------------------------|
router.post('/admin_send_message', AdminInjects_1.InjectedSendAdminMessageController.SendAdminMessageControl.bind(AdminInjects_1.InjectedSendAdminMessageController));
// -------------------------------------| FETCH THE EXSISTING CONVERSATION ON THE ADMIN SIDE -----------------------------------------------------------|
router.post('/start_conversation', JwtToken.verifyToken, UserInjects_1.InjectedCreateConversationController.CreateConversationControl.bind(UserInjects_1.InjectedCreateConversationController));
// -------------------------------------| UPDATE THE CONVERSATION'S MESSAGE COUNT TO ZERO --------------------------------------------------------------|
router.get('/update_conversation_unread_count/:id', JwtToken.verifyToken, AdminInjects_1.InjectedUpdateConversationReadCountToZeroController.updateConversationReadToZeroControl.bind(AdminInjects_1.InjectedUpdateConversationReadCountToZeroController));
// -------------------------------------| FETCH THE CONVERSATION'S DOCUMENT USING THE ID ---------------------------------------------------------------|
router.get('/selected_conversation/:id', JwtToken.verifyToken, AdminInjects_1.InjectedGetSelectedConversationController.GetSelectedConversationControl.bind(AdminInjects_1.InjectedGetSelectedConversationController));
// -------------------------------------| GETTING ALL THE ADMIN CHAT LIST MESSAGES FROM THE DATABASE  --------------------------------------------------|
router.get('/get_admin_messages/:conId', JwtToken.verifyToken, AdminInjects_1.InjectedGetAdminMessagessController.GetAdminMessagescontrol.bind(AdminInjects_1.InjectedGetAdminMessagessController));
// -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------|
router.get('/get_conversations_list', JwtToken.verifyToken, AdminInjects_1.InjectedGetConversationListController.GetConversationListControl.bind(AdminInjects_1.InjectedGetConversationListController));
// -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  ---------------------------------------------------------|
router.post("/start_call", JwtToken.verifyToken, AdminInjects_1.InjectedAdminCallFunctionalitiesController.StartingCallControl.bind(AdminInjects_1.InjectedAdminCallFunctionalitiesController));
// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  ----------------------------------------------------------------|
router.post("/accept_call/:callerId", JwtToken.verifyToken, AdminInjects_1.InjectedAdminCallFunctionalitiesController.AcceptingCallControl.bind(AdminInjects_1.InjectedAdminCallFunctionalitiesController));
// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  ----------------------------------------------|
router.post("/decline_call/:callerId", JwtToken.verifyToken, AdminInjects_1.InjectedAdminCallFunctionalitiesController.DecliningCallControl.bind(AdminInjects_1.InjectedAdminCallFunctionalitiesController));
// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  -----------------------------------|
router.post("/disconnect_call/:callerId", JwtToken.verifyToken, AdminInjects_1.InjectedAdminCallFunctionalitiesController.DisconnectingControl.bind(AdminInjects_1.InjectedAdminCallFunctionalitiesController));
// -------------------------------------| FETCH ALL THE CALL LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_calls/:adminId/:page", JwtToken.verifyToken, AdminInjects_1.InjectedGetAdminsCallListController.GetAdminsCallListControl.bind(AdminInjects_1.InjectedGetAdminsCallListController));
// -------------------------------------| FETCH ALL THE USER LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_users_list", JwtToken.verifyToken, AdminInjects_1.InjectedGetUsersListController.GetTheUserListControl.bind(AdminInjects_1.InjectedGetUsersListController));
// -------------------------------------| CLEAR ADMIN CHAT MESSAGES  -----------------------------------------------------------------------------------|
router.get('/clear_admin_chat/:conId', JwtToken.verifyToken, AdminInjects_1.InjectedClearAdminChatMessagesController.clearAllAdminMessagesControl.bind(AdminInjects_1.InjectedClearAdminChatMessagesController));
// -------------------------------------| CHANGE THE UNKNOWN USER TO   -----------------------------------------------------------------------------------|
router.post('/edit_unknown_username', JwtToken.verifyToken, AdminInjects_1.InjectedEditUnknownUsernameController.EditUnknownUsernameControl.bind(AdminInjects_1.InjectedEditUnknownUsernameController));
// -------------------------------------| LOGOUT THE USER AND REMOVE THE JWT TOKEN FROM THE COOKIES   -----------------------------------------------------------------------------------|
router.get("/admin_logout", JwtToken.removeToken);
router.get("/delete_property/:propertyId", AdminInjects_1.InjectedDeleteAdminPropertDataController.DeleteAdminPropertyControl.bind(AdminInjects_1.InjectedDeleteAdminPropertDataController));
exports.default = router;
