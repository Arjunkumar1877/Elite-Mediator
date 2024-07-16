import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedAddUserFcmCodeController, InjectedChekAndSaveUnknwnUserController, InjectedCreateConversationController, InjectedCreateNewUserDataController, InjectedGetAdminsPropertdataController, InjectedGetUnverifiedUserDataController, InjectedGetUserDataByPhoneController, InjectedGetUserMessagesController, InjectedSendAndCreateUserMessageController, InjectedUserCallingFunctionalitiesController, InjectedVerifyAndUpdateUserDataController } from "../../../frameworks/injection/UserInjects";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import {  InjectedGetMessagesController, InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
import { CallModel } from "../../database/models/admin/CallModel";
import {  getMacAddressFromDevice } from "../../services/GetMacAddress/GetMacAddress";
const router:Route = Router();

// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_user", InjectedCreateNewUserDataController.UserCreateControl.bind(InjectedCreateNewUserDataController));

// -------------------------------------| GET THE MAC ADDRESS OF THE DEVICE THE USER IS IN --------------------------------------------------------------------|
router.get("/getmac_address", getMacAddressFromDevice.findMacAddress);

// -------------------------------------| SAVE NEW UNVERIFIED USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_unverified_user", InjectedCreateNewUserDataController.SaveUnverifiedUsderControl.bind(InjectedCreateNewUserDataController));


// // -------------------------------------| SAVE NEW UNVERIFIED USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_unknown_user_data", InjectedChekAndSaveUnknwnUserController.CheckAndSaveUnknownUserControl.bind(InjectedChekAndSaveUnknwnUserController));


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


// -------------------------------------| SEND MESSAGE FROM USER SIDE TO ADMIN --------------------------------------------------------------------|
router.post('/user_send_message_to_admin', InjectedSendAndCreateUserMessageController.SendUserMessageControl.bind(InjectedSendAndCreateUserMessageController))


// -------------------------------------| GETTING ALL THE MESSAGES FROM THE DATABASE  --------------------------------------------------------------------|
router.get('/get_user_messages/:conId', InjectedGetUserMessagesController.GetUserMessagesControl.bind(InjectedGetUserMessagesController));


// // -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  --------------------------------------------------------------------|
router.post("/start_call", InjectedUserCallingFunctionalitiesController.StartingCallControl.bind(InjectedUserCallingFunctionalitiesController));


// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  --------------------------------------------------------------------|
router.post("/accept_call/:callerId", InjectedUserCallingFunctionalitiesController.AcceptingCallControl.bind(InjectedUserCallingFunctionalitiesController));


// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  --------------------------------------------------------------------|
router.post("/decline_call/:callerId", InjectedUserCallingFunctionalitiesController.DecliningCallControl.bind(InjectedUserCallingFunctionalitiesController));


// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  --------------------------------------------------------------------|
router.post("/disconnect_call/:callerId", InjectedUserCallingFunctionalitiesController.DisconnectingControl.bind(InjectedUserCallingFunctionalitiesController));



router.post("/user_add_or_get_fcmtoken", InjectedAddUserFcmCodeController.AddUserFcmTokenControl.bind(InjectedAddUserFcmCodeController))





router.get('/update_readmessage_conversation/:id', async(req, res)=>{
    try {
        const user = await ConversationModel.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                lastMessage: {
                    unread: 0
                }
            }
        }, {new: true})
    } catch (error) {
        console.log(error)
    }
});


router.get('/clear_user_chat/:conId', async (req, res) => {
    try {
        const { conId } = req.params;
        const result = await MessageModel.updateMany(
            { conversationId: conId },
            { $set: { userDeleted: true } }
        );
        res.status(200).json({
            success: true,
            message: `Messages with conversation ID ${conId} have been marked as deleted.`,
            result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating messages.',
            error: error.message
        });
    }
});





// router.get("/get_calls/:id", async(req,res)=>{
//   try {
//     const id = req.params.id;

//     const calles = await CallModel.find({adminId: id}).populate('userId').sort({createdAt: -1});
//     res.json(calles);
    
//   } catch (error: any) {
//     console.log(error)
//   }
// })




export default router;