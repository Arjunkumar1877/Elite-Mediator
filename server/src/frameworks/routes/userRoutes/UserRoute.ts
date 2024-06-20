import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateConversationController, InjectedCreateNewUserDataController, InjectedGetAdminsPropertdataController, InjectedGetUnverifiedUserDataController, InjectedGetUserDataByPhoneController, InjectedVerifyAndUpdateUserDataController } from "../../../frameworks/injection/UserInjects";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { InjectedGetMessagesController, InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
const router:Route = Router();

// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_user", InjectedCreateNewUserDataController.UserCreateControl.bind(InjectedCreateNewUserDataController));


// -------------------------------------| SAVE NEW UNVERIFIED USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_unverified_user", InjectedCreateNewUserDataController.SaveUnverifiedUsderControl.bind(InjectedCreateNewUserDataController));


// -------------------------------------| VERIFY THE USER DATA USING FIREBASE CODE IN THE CLIENT SIDE AND UPDATE --------------------------------------------------------------------|
router.post("/user_update_verify/:id", InjectedVerifyAndUpdateUserDataController.VerifyAndUpdateUserControl.bind(InjectedVerifyAndUpdateUserDataController));


// -------------------------------------| GET THE USER DATA BY USING ID ----------------------------------------------------------------------------|
router.get("/get_user_by_id/:id", InjectedGetUnverifiedUserDataController.GetUnverifiedUserDataControl.bind(InjectedGetUnverifiedUserDataController));


// -------------------------------------| GET THE USER DATA BY USING PHONE ----------------------------------------------------------------------------|
router.post("/get_user_phone", InjectedGetUserDataByPhoneController.GetUserDataByPhone.bind(InjectedGetUserDataByPhoneController));


// -------------------------------------| GET THE ADMINS PROPERT DATA USING PROPID AND ADMINID ----------------------------------------------------------------------------|
router.post("/get_admins_property_data", InjectedGetAdminsPropertdataController.GetAdminsPropertyDataControl.bind(InjectedGetAdminsPropertdataController));


// -------------------------------------| START A NEW CONVERSATION OR FETCH THE EXSISTING CHAT ----------------------------------------------------------------------------|
router.post('/start_conversation', InjectedCreateConversationController.CreateConversationControl.bind(InjectedCreateConversationController));


// -------------------------------------| SEND MESSAGE FROM ADMIN SIDE TO USER --------------------------------------------------------------------|
router.post('/send_message', InjectedSendMesssage.SendMessageControl.bind(InjectedSendMesssage));


// -------------------------------------| GETTING ALL THE MESSAGES FROM THE DATABASE  --------------------------------------------------------------------|
router.get('/get_messages/:convId', InjectedGetMessagesController.GetMessagesControl.bind(InjectedGetMessagesController));


export default router;