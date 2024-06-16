import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateConversation, InjectedCreateNewUserData, InjectedGetUnverifiedUserData, InjectedGetUserDataByPHone, InjectedVerifyAndUpdateUserData } from "../../../frameworks/injection/UserInjects";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
const router:Route = Router();

// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_user", InjectedCreateNewUserData.UserCreateControl.bind(InjectedCreateNewUserData));


// -------------------------------------| VERIFY THE USER DATA USING FIREBASE CODE IN THE CLIENT SIDE AND UPDATE --------------------------------------------------------------------|
router.post("/user_update_verify/:id", InjectedVerifyAndUpdateUserData.VerifyAndUpdateUserControl.bind(InjectedVerifyAndUpdateUserData));


// -------------------------------------| GET THE USER DATA BY USING ID ----------------------------------------------------------------------------|
router.get("/get_user_by_id/:id", InjectedGetUnverifiedUserData.GetUnverifiedUserDataControl.bind(InjectedGetUnverifiedUserData));


// -------------------------------------| GET THE USER DATA BY USING PHONE ----------------------------------------------------------------------------|
router.post("/get_user_phone", InjectedGetUserDataByPHone.GetUserDataByPhone.bind(InjectedGetUserDataByPHone));


// -------------------------------------| GET THE USER DATA BY USING PHONE ----------------------------------------------------------------------------|
router.post('/start_conversation', InjectedCreateConversation.CreateConversationControl.bind(InjectedCreateConversation));


// router.post('/update_user_conversationId', async(req, res)=>{
//     try {
//         const user = await UserModel.findOneAndUpdate({_id: req.body.userId}, {
//             $set: {
//                 conversationId: req.body.conversationId
//             }
//         },{new: true});

//         console.log(user)
//         res.json(user)
//     } catch (error) {
//         console.log(error)
//     }
// })


router.post('/send_message', async (req, res) => {
    const { conversationId, senderId, senderModel, text } = req.body;

    try {
        const newMessage = new MessageModel({ conversationId, senderId, senderModel, text });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error: any) {
        res.status(500).json({ error: error?.message });
    }
});

router.get('/get_messages/:convId', async (req, res) => {
    try {
      // Fetch the conversation based on the conversation ID
      const conversation = await ConversationModel.findOne({ _id: req.params.convId });
  
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
  
      // Fetch messages associated with the conversation
      const messages = await MessageModel.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  });


export default router;