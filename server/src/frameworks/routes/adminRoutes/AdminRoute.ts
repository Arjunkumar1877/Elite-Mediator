import { Router } from "express";
import { Req, Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetAdminAllPropertyDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController, InjectedUpdateConversationReadCountToZeroController, InjectedGetSelectedConversationController, InjectedGetConversationListController, InjectedGetAdminsCallListController, InjectedGetUsersListController, InjectedClearAdminChatMessagesController, InjectedEditUnknownUsernameController } from "../../../frameworks/injection/AdminInjects";
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
router.post("/admin_login", InjectedAdminlogincontroller.login.bind(InjectedAdminlogincontroller));

// -------------------------------------| GOOGLE AUTHENTICATION ----------------------------------------------------------------------------------------|
router.post("/google_oauth",JwtToken.CreateJwtToken,  InjectedGoogleLoginController.GoogleoauthController.bind(InjectedGoogleLoginController));

// -------------------------------------| UPDATE THE ADDMIN PROFILE ------------------------------------------------------------------------------------|
router.post("/update_admin/:id",  InjectedUpdateAdminProfileController.UpdateAdminProfileData.bind(InjectedUpdateAdminProfileController));

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID ---------------------------------------------------------------------------|
router.get("/get_admin/:id", InjectedGetAdminDataController.GetAdminDataByIdController.bind(InjectedGetAdminDataController));

// -------------------------------------| GET THE GENRATED ADMIN CODE ----------------------------------------------------------------------------------|
router.get("/generate_code/:adminId/:propertyId", InjectedGenerateQrCodeController.GenerateQrCode.bind(InjectedGenerateQrCodeController));

// -------------------------------------| SAVE PROPERTY DATA AND QRCODE --------------------------------------------------------------------------------|
router.post("/save_property_data", InjectedSavePropertyDataController.SavePropertyDataControl.bind(InjectedSavePropertyDataController));

// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------------|
router.get("/get_admin_property_data/:id", InjectedGetAdminAllPropertyDataController.GetAdminPropertyDataControl.bind(InjectedGetAdminAllPropertyDataController));

// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER -------------------------------------------------------------------------|
router.post('/send_message', InjectedSendMesssage.SendMessageControl.bind(InjectedSendMesssage));

// -------------------------------------| FETCH THE EXSISTING CONVERSATION ON THE ADMIN SIDE -----------------------------------------------------------|
router.post('/start_conversation', InjectedCreateConversationController.CreateConversationControl.bind(InjectedCreateConversationController));

// -------------------------------------| UPDATE THE CONVERSATION'S MESSAGE COUNT TO ZERO --------------------------------------------------------------|
router.get('/update_conversation_unread_count/:id', InjectedUpdateConversationReadCountToZeroController.updateConversationReadToZeroControl.bind(InjectedUpdateConversationReadCountToZeroController));

// -------------------------------------| FETCH THE CONVERSATION'S DOCUMENT USING THE ID ---------------------------------------------------------------|
router.get('/selected_conversation/:id',  InjectedGetSelectedConversationController.GetSelectedConversationControl.bind(InjectedGetSelectedConversationController));

// -------------------------------------| GETTING ALL THE ADMIN CHAT LIST MESSAGES FROM THE DATABASE  --------------------------------------------------|
router.get('/get_admin_messages/:conId', InjectedGetMessagesController.GetMessagesControl.bind(InjectedGetMessagesController));

// -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------|
router.get('/conversations_list', InjectedGetConversationListController.GetConversationListControl.bind(InjectedGetConversationListController));

// -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  ---------------------------------------------------------|
router.post("/start_call", InjectedCallingFunctionalitiesController.StartingCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  ----------------------------------------------------------------|
router.post("/accept_call/:callerId", InjectedCallingFunctionalitiesController.AcceptingCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  ----------------------------------------------|
router.post("/decline_call/:callerId", InjectedCallingFunctionalitiesController.DecliningCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  -----------------------------------|
router.post("/disconnect_call/:callerId", InjectedCallingFunctionalitiesController.DisconnectingControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| FETCH ALL THE CALL LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_calls/:adminId", InjectedGetAdminsCallListController.GetAdminsCallListControl.bind(InjectedGetAdminsCallListController));

// -------------------------------------| FETCH ALL THE USER LIST OF THE ADMIN FROM THE DATABASE  ------------------------------------------------------|
router.get("/get_users_list", InjectedGetUsersListController.GetTheUserListControl.bind(InjectedGetUsersListController));


// -------------------------------------| CLEAR ADMIN CHAT MESSAGES  -----------------------------------------------------------------------------------|
router.get('/clear_admin_chat/:conId',  InjectedClearAdminChatMessagesController.clearAllAdminMessagesControl.bind(InjectedClearAdminChatMessagesController));

// -------------------------------------| CHANGE THE UNKNOWN USER TO   -----------------------------------------------------------------------------------|
router.post('/edit_unknown_username', InjectedEditUnknownUsernameController.EditUnknownUsernameControl.bind(InjectedEditUnknownUsernameController))





// interface GetUsersListRequest extends Request {
//     query: {
//       adminId: string;
//       startDate?: string;
//       endDate?: string;
//       propertyName?: string;
//       userType?: string;
//     };
//   }
  
//   export const getUsersList = async (req: Req, res:any) => {
//     try {
//       const { adminId, startDate, endDate, propertyName, userType } = req.query;

//       if(propertyName === 'All' || userType === 'All'){
        
//         const users = await UserModel.find({adminId: adminId});
//         res.json(users)
//         return 
//       }
  
//       const filter: any = {
//         adminId: adminId,
//       };
  
//       if (startDate) {
//         filter.createdAt = { $gte: new Date(startDate) };
//       }
//       if (endDate) {
//         filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate) };
//       }
//       if (propertyName) {
//         filter.propId = propertyName;
//       }
  
//       if (userType) {
//         const properties = await QrModel.find({ userType });
//         const propertyIds = properties.map(property => property._id);
//         filter.propId = { $in: propertyIds };
//       }
  
//       const users = await UserModel.find(filter).populate('propId');
//       res.json(users.length ? users : "Empty list");
//     } catch (error) {
//       console.error("Error fetching users list:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
 
 
// //   router.get('/get_users_list', getUsersList);
  




export default router;