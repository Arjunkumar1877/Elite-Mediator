import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetAdminAllPropertyDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController, InjectedUpdateConversationReadCountToZeroController, InjectedGetSelectedConversationController, InjectedGetConversationListController } from "../../../frameworks/injection/AdminInjects";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import moment from 'moment';
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
import { InjectedCreateConversationController } from "../../../frameworks/injection/UserInjects";

const router: Route = Router();

const JwtToken = new JwtTokenAdapter();

// -------------------------------------| ADMIN SIGN UP-----------------------------------------------------------------------------------|
router.post("/signup", InjectedAdminSignUpController.signUpAdmin.bind(InjectedAdminSignUpController));

// -------------------------------------| GET THE UNVERIFIED ADMIN------------------------------------------------------------------------|
router.get("/unverified_admin/:phone", InjectedGetUnverifiedAdminController.getUnverifiedAdminController.bind(InjectedGetUnverifiedAdminController));

// -------------------------------------| VERIFY THE ADMIN BY THE FIREBASE VERIFICATION ID -----------------------------------------------|
router.post("/update_firebase_verify", InjectedUpdateVerifyAdminController.UpdateAdminVerifyController.bind(InjectedUpdateVerifyAdminController));

// -------------------------------------| VERIFY THE ADMIN AND LOGIN ---------------------------------------------------------------------|
router.post("/admin_login", InjectedAdminlogincontroller.login.bind(InjectedAdminlogincontroller));

// -------------------------------------| GOOGLE AUTHENTICATION --------------------------------------------------------------------------|
router.post("/google_oauth",JwtToken.CreateJwtToken,  InjectedGoogleLoginController.GoogleoauthController.bind(InjectedGoogleLoginController));

// -------------------------------------| UPDATE THE ADDMIN PROFILE ----------------------------------------------------------------------|
router.post("/update_admin/:id",  InjectedUpdateAdminProfileController.UpdateAdminProfileData.bind(InjectedUpdateAdminProfileController));

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID -------------------------------------------------------------|
router.get("/get_admin/:id", InjectedGetAdminDataController.GetAdminDataByIdController.bind(InjectedGetAdminDataController));

// -------------------------------------| GET THE GENRATED ADMIN CODE --------------------------------------------------------------------|
router.get("/generate_code/:adminId/:propertyId", InjectedGenerateQrCodeController.GenerateQrCode.bind(InjectedGenerateQrCodeController));

// -------------------------------------| SAVE PROPERTY DATA AND QRCODE --------------------------------------------------------------------|
router.post("/save_property_data", InjectedSavePropertyDataController.SavePropertyDataControl.bind(InjectedSavePropertyDataController));

// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------|
router.get("/get_admin_property_data/:id", InjectedGetAdminAllPropertyDataController.GetAdminPropertyDataControl.bind(InjectedGetAdminAllPropertyDataController));

// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER --------------------------------------------------------------------|
router.post('/send_message', InjectedSendMesssage.SendMessageControl.bind(InjectedSendMesssage));

// -------------------------------------| FETCH THE EXSISTING CONVERSATION ON THE ADMIN SIDE ----------------------------------------------------------------------------|
router.post('/start_conversation', InjectedCreateConversationController.CreateConversationControl.bind(InjectedCreateConversationController));

// -------------------------------------| UPDATE THE CONVERSATION'S MESSAGE COUNT TO ZERO ----------------------------------------------------------------------------|
router.get('/update_conversation_unread_count/:id', InjectedUpdateConversationReadCountToZeroController.updateConversationReadToZeroControl.bind(InjectedUpdateConversationReadCountToZeroController));

// -------------------------------------| FETCH THE CONVERSATION'S DOCUMENT USING THE ID ----------------------------------------------------------------------------|
router.get('/selected_conversation/:id',  InjectedGetSelectedConversationController.GetSelectedConversationControl.bind(InjectedGetSelectedConversationController));


// -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------------|
router.get('/conversations_list', InjectedGetConversationListController.GetConversationListControl.bind(InjectedGetConversationListController));


  // router.get('/conversations_list', async (req, res) => {
  //   const { adminId, page = '1', limit = '10', filter = 'all' } = req.query as {
  //     adminId: string,
  //     page?: string,
  //     limit?: string,
  //     filter?: string
  //   };
  
  //   const startOfToday = moment().startOf('day');
  //   const startOfWeek = moment().startOf('week');
  //   const startOfMonth = moment().startOf('month');
    
  //   let filterQuery: any = { adminId };
    
  //   if (filter === 'today') {
  //     filterQuery.createdAt = { $gte: startOfToday.toDate() };
  //   } else if (filter === 'this_week') {
  //     filterQuery.createdAt = { $gte: startOfWeek.toDate() };
  //   } else if (filter === 'this_month') {
  //     filterQuery.createdAt = { $gte: startOfMonth.toDate() };
  //   }
    
  //   try {
  //     const conversations = await ConversationModel.find(filterQuery).populate('userId')
  //       .skip((parseInt(page) - 1) * parseInt(limit))
  //       .limit(parseInt(limit))
  //       .sort({ createdAt: -1 });
  //     const totalConversations = await ConversationModel.countDocuments(filterQuery);
  //     res.status(200).json({
  //       conversations,
  //       totalPages: Math.ceil(totalConversations / parseInt(limit)),
  //       currentPage: parseInt(page)
  //     });
  //   } catch (error) {
  //     console.error('Error fetching conversations:', error);
  //     res.status(500).json({ error: 'Failed to fetch conversations' });
  //   }
  // });
  
  
  

export default router;