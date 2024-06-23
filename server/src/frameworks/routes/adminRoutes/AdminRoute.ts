import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetAdminAllPropertyDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController, InjectedUpdateConversationReadCountToZeroController } from "../../../frameworks/injection/AdminInjects";
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



router.get('/update_conversation_unread_count/:id', InjectedUpdateConversationReadCountToZeroController.updateConversationReadToZeroControl.bind(InjectedUpdateConversationReadCountToZeroController));




// router.get('/update_conversation_unread_count/:id', async (req, res) => {
//   try {
//       // Fetch the existing conversation
//       const exConv = await ConversationModel.findOne({ _id: req.params.id });

//       if (!exConv) {
//           return res.status(404).json({ error: 'Conversation not found' });
//       }

//       // Update lastMessage with unread count reset to 0
//       const conversation = await ConversationModel.findOneAndUpdate(
//           { _id: req.params.id },
//           {
//               $set: {
//                   lastMessage: {
//                       text: exConv.lastMessage?.text,
//                       time: exConv.lastMessage?.time,
//                       unread: 0 
//                   }
//               }
//           },
//           { new: true }
//       );

//       if (!conversation) {
//           return res.status(404).json({ error: 'Conversation not found after update' });
//       }

//       // Fetch all conversations related to the admin after updating lastMessage
//       const conversations = await ConversationModel.find({ adminId: conversation.adminId });

//       // Send the updated conversations as a response
//       res.json(conversations);
//   } catch (error) {
//       console.error("Error updating lastMessage and fetching conversations:", error);
//       res.status(500).json({ error: 'Server error' }); // Handle or throw the error as needed
//   }
// });





router.get('/selected_conversation/:id', async (req, res) => {
    // const { conversationId } = req.query;
    console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️")
    try {
      console.log(req.params.id)
      const conversations = await ConversationModel.findOne({ _id: req.params.id }).populate('userId')
      console.log(conversations + "💕💕💕💕💕")
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  });

// Route to get messages for a conversation
router.get('/messages/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    try {
      const messages = await MessageModel.find({ conversationId }).sort({ createdAt: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

// Route to send a message
router.post('/send-message', async (req, res) => {
    const { conversationId, senderId, senderModel, text } = req.body;
    try {
      const message = new MessageModel({ conversationId, senderId, senderModel, text });
      await message.save();
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  });


  router.get('/conversations_list', async (req, res) => {
    const { adminId, page = '1', limit = '10', filter = 'all' } = req.query as {
      adminId: string,
      page?: string,
      limit?: string,
      filter?: string
    };
  
    const startOfToday = moment().startOf('day');
    const startOfWeek = moment().startOf('week');
    const startOfMonth = moment().startOf('month');
    
    let filterQuery: any = { adminId };
    
    if (filter === 'today') {
      filterQuery.createdAt = { $gte: startOfToday.toDate() };
    } else if (filter === 'this_week') {
      filterQuery.createdAt = { $gte: startOfWeek.toDate() };
    } else if (filter === 'this_month') {
      filterQuery.createdAt = { $gte: startOfMonth.toDate() };
    }
    
    try {
      const conversations = await ConversationModel.find(filterQuery).populate('userId')
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
      const totalConversations = await ConversationModel.countDocuments(filterQuery);
      res.status(200).json({
        conversations,
        totalPages: Math.ceil(totalConversations / parseInt(limit)),
        currentPage: parseInt(page)
      });
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  });
  
  
  

export default router;