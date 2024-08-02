"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserInjects_1 = require("../../../frameworks/injection/UserInjects");
const ConversationModel_1 = require("../../../frameworks/database/models/admin/ConversationModel");
const MessageModel_1 = require("../../../frameworks/database/models/admin/MessageModel");
const GetMacAddress_1 = require("../../services/GetMacAddress/GetMacAddress");
const router = (0, express_1.Router)();
// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_verified_user", UserInjects_1.InjectedCheckAndSaveVerifiedUsersController.CheckAndSaveVerifiedUserControl.bind(UserInjects_1.InjectedCheckAndSaveVerifiedUsersController));
// -------------------------------------| GET THE MAC ADDRESS OF THE DEVICE THE USER IS IN --------------------------------------------------------------------|
router.get("/getmac_address", GetMacAddress_1.getMacAddressFromDevice.findMacAddress);
// -------------------------------------| SAVE NEW UNVERIFIED USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_unverified_user", UserInjects_1.InjectedCheckAndSaveUnVerifiedUsersController.CheckAndSaveUnverifiedUserControl.bind(UserInjects_1.InjectedCheckAndSaveUnVerifiedUsersController));
// -------------------------------------| UPDATE THE SANNED COUNT OF THE PROPERTY DATA INTO THE DATABASE --------------------------------------------------------------------|
router.get("/update_property_scanned_count/:propId", UserInjects_1.InjectedUpdatePropertyScannedCountController.UpdatePropertyDataScannedCount.bind(UserInjects_1.InjectedUpdatePropertyScannedCountController));
// // -------------------------------------| SAVE NEW UNVERIFIED USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_unknown_user_data", UserInjects_1.InjectedChekAndSaveUnknwnUserController.CheckAndSaveUnknownUserControl.bind(UserInjects_1.InjectedChekAndSaveUnknwnUserController));
// -------------------------------------| VERIFY THE USER DATA USING FIREBASE CODE IN THE CLIENT SIDE AND UPDATE --------------------------------------------------------------------|
router.post("/user_update_verify/:id", UserInjects_1.InjectedVerifyAndUpdateUserDataController.VerifyAndUpdateUserControl.bind(UserInjects_1.InjectedVerifyAndUpdateUserDataController));
// -------------------------------------| GET THE USER DATA BY USING ID ----------------------------------------------------------------------------|
router.get("/get_user_by_id/:id", UserInjects_1.InjectedGetUnverifiedUserDataController.GetUnverifiedUserDataControl.bind(UserInjects_1.InjectedGetUnverifiedUserDataController));
// -------------------------------------| GET THE USER DATA BY USING PHONE ----------------------------------------------------------------------------|
router.post("/get_user_phone", UserInjects_1.InjectedGetUserDataByPhoneController.GetUserDataByPhone.bind(UserInjects_1.InjectedGetUserDataByPhoneController));
// -------------------------------------| GET THE ADMINS PROPERT DATA USING PROPID AND ADMINID ----------------------------------------------------------------------------|
router.post("/get_admins_property_data", UserInjects_1.InjectedGetAdminsPropertdataController.GetAdminsPropertyDataControl.bind(UserInjects_1.InjectedGetAdminsPropertdataController));
// -------------------------------------| START A NEW CONVERSATION OR FETCH THE EXSISTING CHAT ----------------------------------------------------------------------------|
router.post('/start_conversation', UserInjects_1.InjectedCreateConversationController.CreateConversationControl.bind(UserInjects_1.InjectedCreateConversationController));
// -------------------------------------| SEND MESSAGE FROM USER SIDE TO ADMIN --------------------------------------------------------------------|
router.post('/user_send_message_to_admin', UserInjects_1.InjectedSendAndCreateUserMessageController.SendUserMessageControl.bind(UserInjects_1.InjectedSendAndCreateUserMessageController));
// -------------------------------------| GETTING ALL THE MESSAGES FROM THE DATABASE  --------------------------------------------------------------------|
router.get('/get_user_messages/:conId', UserInjects_1.InjectedGetUserMessagesController.GetUserMessagesControl.bind(UserInjects_1.InjectedGetUserMessagesController));
// // -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  --------------------------------------------------------------------|
router.post("/start_call", UserInjects_1.InjectedUserCallingFunctionalitiesController.StartingCallControl.bind(UserInjects_1.InjectedUserCallingFunctionalitiesController));
// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  --------------------------------------------------------------------|
router.post("/accept_call/:callerId", UserInjects_1.InjectedUserCallingFunctionalitiesController.AcceptingCallControl.bind(UserInjects_1.InjectedUserCallingFunctionalitiesController));
// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  --------------------------------------------------------------------|
router.post("/decline_call/:callerId", UserInjects_1.InjectedUserCallingFunctionalitiesController.DecliningCallControl.bind(UserInjects_1.InjectedUserCallingFunctionalitiesController));
// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  --------------------------------------------------------------------|
router.post("/disconnect_call/:callerId", UserInjects_1.InjectedUserCallingFunctionalitiesController.DisconnectingControl.bind(UserInjects_1.InjectedUserCallingFunctionalitiesController));
router.post("/user_add_or_get_fcmtoken", UserInjects_1.InjectedAddUserFcmCodeController.AddUserFcmTokenControl.bind(UserInjects_1.InjectedAddUserFcmCodeController));
router.get('/update_readmessage_conversation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield ConversationModel_1.ConversationModel.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                lastMessage: {
                    unread: 0
                }
            }
        }, { new: true });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/clear_user_chat/:conId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conId } = req.params;
        const result = yield MessageModel_1.MessageModel.updateMany({ conversationId: conId }, { $set: { userDeleted: true } });
        res.status(200).json({
            success: true,
            message: `Messages with conversation ID ${conId} have been marked as deleted.`,
            result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating messages.',
            error: error.message
        });
    }
}));
// router.get("/get_calls/:id", async(req,res)=>{
//   try {
//     const id = req.params.id;
//     const calles = await CallModel.find({adminId: id}).populate('userId').sort({createdAt: -1});
//     res.json(calles);
//   } catch (error: any) {
//     console.log(error)
//   }
// })
exports.default = router;
