import { Router } from "express";
import {  Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetAdminAllPropertyDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController, InjectedUpdateConversationReadCountToZeroController, InjectedGetSelectedConversationController, InjectedGetConversationListController, InjectedGetAdminsCallListController, InjectedGetUsersListController, InjectedClearAdminChatMessagesController, InjectedEditUnknownUsernameController, InjectedAddNewFcmTokenOrGetExsistingeController, InjectedSendAdminMessageController, InjectedUserStatisticsGraphController, InjectedGetAdminPropertyDataForFilteringController, InjectedDeleteUserDataAndConversationController, InjectedAdminCallFunctionalitiesController, InjectedGetAdminMessagessController, InjectedDeleteAdminPropertDataController, InjectedSenEmailOtpAndUpdateController, InjectedGetAdminDataByEmailController, InjectedAdminResetPasswordController } from "../../../frameworks/injection/AdminInjects";
import { InjectedCreateConversationController } from "../../../frameworks/injection/UserInjects";
import { SendEmailOtp } from "../../services/NodeMailerService/nodeMailer";
import { AdminModel } from "../../database/models/admin/AdminModel";

const router: Route = Router();

const JwtToken = new JwtTokenAdapter();

// -------------------------------------| ADMIN SIGN UP-------------------------------------------------------------------------------------------------|
router.post("/signup", InjectedAdminSignUpController.signUpAdmin.bind(InjectedAdminSignUpController));

// -------------------------------------| SEND EMAIL OTP AND UPDATE ON DB-------------------------------------------------------------------------------------------------|
router.get("/send_email_otp", InjectedSenEmailOtpAndUpdateController.SendEmailOtpAndSaveToDbControl.bind(InjectedSenEmailOtpAndUpdateController));

// -------------------------------------| GET THE UNVERIFIED ADMIN--------------------------------------------------------------------------------------|
router.get("/unverified_admin/:phone", InjectedGetUnverifiedAdminController.getUnverifiedAdminController.bind(InjectedGetUnverifiedAdminController));

// -------------------------------------| VERIFY THE ADMIN BY THE FIREBASE VERIFICATION ID-------------------------------------------------------------|
router.post("/update_firebase_verify", InjectedUpdateVerifyAdminController.UpdateAdminVerifyController.bind(InjectedUpdateVerifyAdminController));

// -------------------------------------| VERIFY THE ADMIN AND LOGIN-----------------------------------------------------------------------------------|
router.get('/get_admin_by_email/:email', InjectedGetAdminDataByEmailController.GetAdminDataControl.bind(InjectedGetAdminDataByEmailController))

// -------------------------------------| VERIFY THE ADMIN AND LOGIN-----------------------------------------------------------------------------------|
router.post("/admin_login", JwtToken.CreateJwtToken, InjectedAdminlogincontroller.login.bind(InjectedAdminlogincontroller));

// -------------------------------------| GOOGLE AUTHENTICATION----------------------------------------------------------------------------------------|
router.post("/google_oauth",JwtToken.CreateJwtToken,  InjectedGoogleLoginController.GoogleoauthController.bind(InjectedGoogleLoginController));

// -------------------------------------| UPDATE THE ADDMIN PROFILE------------------------------------------------------------------------------------|
router.post("/update_admin/:id",JwtToken.verifyToken,  InjectedUpdateAdminProfileController.UpdateAdminProfileData.bind(InjectedUpdateAdminProfileController));

// -------------------------------------| ADD A NEW FCM TOKEN TO ADMIN OR GET THE ADMIN WITH THE EXSISTING FCM TOKEN-----------------------------------------------------------------------------------|
router.post('/admin_add_or_get_fcmtoken', InjectedAddNewFcmTokenOrGetExsistingeController.AddAdminFcmTokenControl.bind(InjectedAddNewFcmTokenOrGetExsistingeController));

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID---------------------------------------------------------------------------|
router.get("/get_admin/:id",JwtToken.verifyToken, InjectedGetAdminDataController.GetAdminDataByIdController.bind(InjectedGetAdminDataController));

// -------------------------------------| GET THE USER STATISTIC GRAPH DATA FOR THE ADMIN DASHBOARD   -----------------------------------------------------------------------------------|
router.get("/admin_dash_graph/:adminId", InjectedUserStatisticsGraphController.GetUserStatisticsGraphDataControl.bind(InjectedUserStatisticsGraphController))

// -------------------------------------| GET THE GENRATED ADMIN CODE ----------------------------------------------------------------------------------|
router.get("/generate_code/:adminId/:propertyId",JwtToken.verifyToken, InjectedGenerateQrCodeController.GenerateQrCode.bind(InjectedGenerateQrCodeController));

// -------------------------------------| SAVE PROPERTY DATA AND QRCODE --------------------------------------------------------------------------------|
router.post("/save_property_data",JwtToken.verifyToken, InjectedSavePropertyDataController.SavePropertyDataControl.bind(InjectedSavePropertyDataController));

// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------------|
router.get("/get_admin_property_data/:id", JwtToken.verifyToken, InjectedGetAdminAllPropertyDataController.GetAdminPropertyDataControl.bind(InjectedGetAdminAllPropertyDataController));

// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------------|
router.get("/get_admin_property_data_filtering/:adminId", JwtToken.verifyToken, InjectedGetAdminPropertyDataForFilteringController.GetAdminPropertyDataForFilteringControl.bind(InjectedGetAdminPropertyDataForFilteringController));

// -------------------------------------| SOFT DELETE THE PROPERTY DATA --------------------------------------------------------------------------|
router.get("/delete_property/:propertyId", InjectedDeleteAdminPropertDataController.DeleteAdminPropertyControl.bind(InjectedDeleteAdminPropertDataController))

// -------------------------------------| SOFT DELETE THE USER DATA --------------------------------------------------------------------------|
router.get('/admin_delete_user_data/:userId', InjectedDeleteUserDataAndConversationController.DeleteUserDataConversatiionControl.bind(InjectedDeleteUserDataAndConversationController))

// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER -------------------------------------------------------------------------|
router.post('/admin_send_message',  InjectedSendAdminMessageController.SendAdminMessageControl.bind(InjectedSendAdminMessageController));

// -------------------------------------| FETCH THE EXSISTING CONVERSATION ON THE ADMIN SIDE -----------------------------------------------------------|
router.post('/start_conversation',JwtToken.verifyToken, InjectedCreateConversationController.CreateConversationControl.bind(InjectedCreateConversationController));

// -------------------------------------| UPDATE THE CONVERSATION'S MESSAGE COUNT TO ZERO --------------------------------------------------------------|
router.get('/update_conversation_unread_count/:id',JwtToken.verifyToken, InjectedUpdateConversationReadCountToZeroController.updateConversationReadToZeroControl.bind(InjectedUpdateConversationReadCountToZeroController));

// -------------------------------------| FETCH THE CONVERSATION'S DOCUMENT USING THE ID ---------------------------------------------------------------|
router.get('/selected_conversation/:id',JwtToken.verifyToken,  InjectedGetSelectedConversationController.GetSelectedConversationControl.bind(InjectedGetSelectedConversationController));

// -------------------------------------| GETTING ALL THE ADMIN CHAT LIST MESSAGES FROM THE DATABASE  --------------------------------------------------|
router.get('/get_admin_messages/:conId',JwtToken.verifyToken,  InjectedGetAdminMessagessController.GetAdminMessagescontrol.bind(InjectedGetAdminMessagessController));

// -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------|
router.get('/get_conversations_list',JwtToken.verifyToken, InjectedGetConversationListController.GetConversationListControl.bind(InjectedGetConversationListController));

// -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  ---------------------------------------------------------|
router.post("/start_call",JwtToken.verifyToken, InjectedAdminCallFunctionalitiesController.StartingCallControl.bind(InjectedAdminCallFunctionalitiesController));

// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  ----------------------------------------------------------------|
router.post("/accept_call/:callerId",JwtToken.verifyToken, InjectedAdminCallFunctionalitiesController.AcceptingCallControl.bind(InjectedAdminCallFunctionalitiesController));

// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  ----------------------------------------------|
router.post("/decline_call/:callerId",JwtToken.verifyToken, InjectedAdminCallFunctionalitiesController.DecliningCallControl.bind(InjectedAdminCallFunctionalitiesController));

// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  -----------------------------------|
router.post("/disconnect_call/:callerId",JwtToken.verifyToken, InjectedAdminCallFunctionalitiesController.DisconnectingControl.bind(InjectedAdminCallFunctionalitiesController));

// -------------------------------------| FETCH ALL THE CALL LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_calls/:adminId/:page",JwtToken.verifyToken, InjectedGetAdminsCallListController.GetAdminsCallListControl.bind(InjectedGetAdminsCallListController));

// -------------------------------------| FETCH ALL THE USER LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_users_list",JwtToken.verifyToken, InjectedGetUsersListController.GetTheUserListControl.bind(InjectedGetUsersListController));

// -------------------------------------| CLEAR ADMIN CHAT MESSAGES  -----------------------------------------------------------------------------------|
router.get('/clear_admin_chat/:conId', JwtToken.verifyToken, InjectedClearAdminChatMessagesController.clearAllAdminMessagesControl.bind(InjectedClearAdminChatMessagesController));

// -------------------------------------| CHANGE THE UNKNOWN USER TO   -----------------------------------------------------------------------------------|
router.post('/edit_unknown_username', JwtToken.verifyToken, InjectedEditUnknownUsernameController.EditUnknownUsernameControl.bind(InjectedEditUnknownUsernameController))

// -------------------------------------| LOGOUT THE USER AND REMOVE THE JWT TOKEN FROM THE COOKIES   -----------------------------------------------------------------------------------|
router.get("/admin_logout", JwtToken.removeToken);

// -------------------------------------| RESET PASSWORD OF THE ADMIN AND UPDATE IT   -----------------------------------------------------------------------------------|
router.post('/admin_reset_password', InjectedAdminResetPasswordController.ResetPasswordControl.bind(InjectedAdminResetPasswordController));



export default router;