import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateConversation, InjectedCreateNewUserData, InjectedGetUnverifiedUserData, InjectedGetUserDataByPHone, InjectedVerifyAndUpdateUserData } from "../../../frameworks/injection/UserInjects";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { InjectedGetMessagesController, InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
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


// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER --------------------------------------------------------------------|
router.post('/send_message', InjectedSendMesssage.SendMessageControl.bind(InjectedSendMesssage));


// -------------------------------------| GETTING ALL THE MESSAGES FROM THE DATABASE  --------------------------------------------------------------------|
router.get('/get_messages/:convId', InjectedGetMessagesController.GetMessagesControl.bind(InjectedGetMessagesController));


export default router;