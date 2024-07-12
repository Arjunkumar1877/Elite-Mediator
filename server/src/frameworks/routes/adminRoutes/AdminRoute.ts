import { Router } from "express";
import { Req, Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetAdminAllPropertyDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController, InjectedUpdateConversationReadCountToZeroController, InjectedGetSelectedConversationController, InjectedGetConversationListController, InjectedGetAdminsCallListController, InjectedGetUsersListController, InjectedClearAdminChatMessagesController, InjectedEditUnknownUsernameController, InjectedAddNewFcmTokenOrGetExsistingeController, InjectedSendAdminMessageController } from "../../../frameworks/injection/AdminInjects";
import { InjectedCallingFunctionalitiesController, InjectedGetMessagesController, InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
import { InjectedCreateConversationController } from "../../../frameworks/injection/UserInjects";
import { UserModel } from "../../database/models/user/User";
import { QrModel } from "../../database/models/admin/QrDataModel";

const router: Route = Router();

const JwtToken = new JwtTokenAdapter();

// -------------------------------------| ADMIN SIGN UP-------------------------------------------------------------------------------------------------|
router.post("/signup", InjectedAdminSignUpController.signUpAdmin.bind(InjectedAdminSignUpController));

// -------------------------------------| GET THE UNVERIFIED ADMIN--------------------------------------------------------------------------------------|
router.get("/unverified_admin/:phone", InjectedGetUnverifiedAdminController.getUnverifiedAdminController.bind(InjectedGetUnverifiedAdminController));

// -------------------------------------| VERIFY THE ADMIN BY THE FIREBASE VERIFICATION ID -------------------------------------------------------------|
router.post("/update_firebase_verify", InjectedUpdateVerifyAdminController.UpdateAdminVerifyController.bind(InjectedUpdateVerifyAdminController));

// -------------------------------------| VERIFY THE ADMIN AND LOGIN -----------------------------------------------------------------------------------|
router.post("/admin_login", JwtToken.CreateJwtToken, InjectedAdminlogincontroller.login.bind(InjectedAdminlogincontroller));

// -------------------------------------| GOOGLE AUTHENTICATION ----------------------------------------------------------------------------------------|
router.post("/google_oauth",JwtToken.CreateJwtToken,  InjectedGoogleLoginController.GoogleoauthController.bind(InjectedGoogleLoginController));

// -------------------------------------| UPDATE THE ADDMIN PROFILE ------------------------------------------------------------------------------------|
router.post("/update_admin/:id",JwtToken.verifyToken,  InjectedUpdateAdminProfileController.UpdateAdminProfileData.bind(InjectedUpdateAdminProfileController));

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID ---------------------------------------------------------------------------|
router.get("/get_admin/:id",JwtToken.verifyToken, InjectedGetAdminDataController.GetAdminDataByIdController.bind(InjectedGetAdminDataController));

// -------------------------------------| GET THE GENRATED ADMIN CODE ----------------------------------------------------------------------------------|
router.get("/generate_code/:adminId/:propertyId",JwtToken.verifyToken, InjectedGenerateQrCodeController.GenerateQrCode.bind(InjectedGenerateQrCodeController));

// -------------------------------------| SAVE PROPERTY DATA AND QRCODE --------------------------------------------------------------------------------|
router.post("/save_property_data",JwtToken.verifyToken, InjectedSavePropertyDataController.SavePropertyDataControl.bind(InjectedSavePropertyDataController));

// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------------|
router.get("/get_admin_property_data/:id", JwtToken.verifyToken, InjectedGetAdminAllPropertyDataController.GetAdminPropertyDataControl.bind(InjectedGetAdminAllPropertyDataController));

// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER -------------------------------------------------------------------------|
// router.post('/send_message', JwtToken.verifyToken, InjectedSendMesssage.SendMessageControl.bind(InjectedSendMesssage));
router.post('/send_message',  InjectedSendAdminMessageController.SendAdminMessageControl.bind(InjectedSendAdminMessageController));



// -------------------------------------| FETCH THE EXSISTING CONVERSATION ON THE ADMIN SIDE -----------------------------------------------------------|
router.post('/start_conversation',JwtToken.verifyToken, InjectedCreateConversationController.CreateConversationControl.bind(InjectedCreateConversationController));

// -------------------------------------| UPDATE THE CONVERSATION'S MESSAGE COUNT TO ZERO --------------------------------------------------------------|
router.get('/update_conversation_unread_count/:id',JwtToken.verifyToken, InjectedUpdateConversationReadCountToZeroController.updateConversationReadToZeroControl.bind(InjectedUpdateConversationReadCountToZeroController));

// -------------------------------------| FETCH THE CONVERSATION'S DOCUMENT USING THE ID ---------------------------------------------------------------|
router.get('/selected_conversation/:id',JwtToken.verifyToken,  InjectedGetSelectedConversationController.GetSelectedConversationControl.bind(InjectedGetSelectedConversationController));

// -------------------------------------| GETTING ALL THE ADMIN CHAT LIST MESSAGES FROM THE DATABASE  --------------------------------------------------|
router.get('/get_admin_messages/:conId',JwtToken.verifyToken, InjectedGetMessagesController.GetMessagesControl.bind(InjectedGetMessagesController));

// -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------|
router.get('/conversations_list',JwtToken.verifyToken, InjectedGetConversationListController.GetConversationListControl.bind(InjectedGetConversationListController));

// -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  ---------------------------------------------------------|
router.post("/start_call",JwtToken.verifyToken, InjectedCallingFunctionalitiesController.StartingCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  ----------------------------------------------------------------|
router.post("/accept_call/:callerId",JwtToken.verifyToken, InjectedCallingFunctionalitiesController.AcceptingCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  ----------------------------------------------|
router.post("/decline_call/:callerId",JwtToken.verifyToken, InjectedCallingFunctionalitiesController.DecliningCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  -----------------------------------|
router.post("/disconnect_call/:callerId",JwtToken.verifyToken, InjectedCallingFunctionalitiesController.DisconnectingControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| FETCH ALL THE CALL LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_calls/:adminId",JwtToken.verifyToken, InjectedGetAdminsCallListController.GetAdminsCallListControl.bind(InjectedGetAdminsCallListController));

// -------------------------------------| FETCH ALL THE USER LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_users_list",JwtToken.verifyToken, InjectedGetUsersListController.GetTheUserListControl.bind(InjectedGetUsersListController));


// -------------------------------------| CLEAR ADMIN CHAT MESSAGES  -----------------------------------------------------------------------------------|
router.get('/clear_admin_chat/:conId', JwtToken.verifyToken, InjectedClearAdminChatMessagesController.clearAllAdminMessagesControl.bind(InjectedClearAdminChatMessagesController));

// -------------------------------------| CHANGE THE UNKNOWN USER TO   -----------------------------------------------------------------------------------|
router.post('/edit_unknown_username', JwtToken.verifyToken, InjectedEditUnknownUsernameController.EditUnknownUsernameControl.bind(InjectedEditUnknownUsernameController))



router.post('/admin_add_or_get_fcmtoken', InjectedAddNewFcmTokenOrGetExsistingeController.AddAdminFcmTokenControl.bind(InjectedAddNewFcmTokenOrGetExsistingeController));

router.get("/admin_dash_graph/:adminId", async(req, res)=>{
    const  adminId  = req.params.adminId;

    const filterUnknown: any = {
        adminId: adminId,
      }; 
        const filterVerified: any = {
        adminId: adminId,
      }; 
        const filterUnVerified: any = {
        adminId: adminId,
      };


        const verifiedProperties = await QrModel.find({ userType: "Verified" });
        const verifiedPropertyIds = verifiedProperties.map(property => property._id);
        filterVerified.propId = { $in: verifiedPropertyIds };
      

        const unknonProperties = await QrModel.find({ userType: "Unknown" });
        const unknownPropertyIds = unknonProperties.map(property => property._id);
        filterUnknown.propId = { $in: unknownPropertyIds };
      
        
        const unverifiedProperties = await QrModel.find({ userType: "Unverified" });
        const unverifiedPropertyIds = unverifiedProperties.map(property => property._id);
        filterUnVerified.propId = { $in: unverifiedPropertyIds };
      


      const All:number = await UserModel.find({adminId: adminId}).countDocuments();
      const unknown: number = await UserModel.find(filterVerified).countDocuments()
      const verified: number = await UserModel.find(filterUnknown).countDocuments()
      const unVerified: number = await UserModel.find(filterUnVerified).countDocuments()

      res.json({All, unknown, verified, unVerified})
})


router.get("/admin_logout", JwtToken.removeToken)


// router.post("/send_push", sendPushMessage);

export default router;