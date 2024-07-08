import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetAdminAllPropertyDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController, InjectedUpdateConversationReadCountToZeroController, InjectedGetSelectedConversationController, InjectedGetConversationListController, InjectedGetAdminsCallListController, InjectedGetUsersListController } from "../../../frameworks/injection/AdminInjects";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import moment from 'moment';
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { InjectedCallingFunctionalitiesController, InjectedGetMessagesController, InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
import { InjectedCreateConversationController } from "../../../frameworks/injection/UserInjects";
import { UserModel } from "../../database/models/user/User";
import { QrModel } from "../../database/models/admin/QrDataModel";

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

// -------------------------------------| GETTING ALL THE ADMIN CHAT LIST MESSAGES FROM THE DATABASE  --------------------------------------------------------------------|
router.get('/get_admin_messages/:conId', InjectedGetMessagesController.GetMessagesControl.bind(InjectedGetMessagesController));
router.get('/get_messages/:convId', InjectedGetMessagesController.GetMessagesControl.bind(InjectedGetMessagesController));

// -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------------|
router.get('/conversations_list', InjectedGetConversationListController.GetConversationListControl.bind(InjectedGetConversationListController));

// -------------------------------------| STARTING A CALL AND SAVING THE DATA TO THE DATABASE  --------------------------------------------------------------------|
router.post("/start_call", InjectedCallingFunctionalitiesController.StartingCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| ACCEPTING THE CALL AND UPDATING THE DATABASE  --------------------------------------------------------------------|
router.post("/accept_call/:callerId", InjectedCallingFunctionalitiesController.AcceptingCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| DECLINING THE CALL BY THE USER AND UPDATING IT TO THE DATABASE  --------------------------------------------------------------------|
router.post("/decline_call/:callerId", InjectedCallingFunctionalitiesController.DecliningCallControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| DISCONNECT THE CONNECTED CALL BY THE USER AND UPDATING IT TO THE DATABASE  --------------------------------------------------------------------|
router.post("/disconnect_call/:callerId", InjectedCallingFunctionalitiesController.DisconnectingControl.bind(InjectedCallingFunctionalitiesController));

// -------------------------------------| FETCH ALL THE CALL LIST OF THE ADMIN FROM THE DATABASE  --------------------------------------------------------------------|
router.get("/get_calls/:adminId", InjectedGetAdminsCallListController.GetAdminsCallListControl.bind(InjectedGetAdminsCallListController));

// -------------------------------------| FETCH ALL THE USER LIST OF THE ADMIN FROM THE DATABASE  --------------------------------------------------------------------|
router.get("/get_users_list/:adminId", InjectedGetUsersListController.GetTheUserListControl.bind(InjectedGetUsersListController))


router.get('/get_admin_properties/:adminId', async(req, res)=>{
    const id = req.params.adminId;

    const data = await QrModel.find({adminId: id});
    res.json(data);
})



router.get('/clear_admin_chat/:conId', async (req, res) => {
    try {
        const { conId } = req.params;
        const result = await MessageModel.updateMany(
            { conversationId: conId },
            { $set: { adminDeleted: true } }
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





// // -------------------------------------| FECH ALL AND FILTERED ADMINS CHAT LIST  ----------------------------------------------------------------------------|
// router.get('/conversations_list', InjectedGetConversationListController.GetConversationListControl.bind(InjectedGetConversationListController));

router.post('/edit_unknown_username', async(req, res)=>{
    try {

        console.log(req.body );
        console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🔥🔥🔥🔥📀💕💕💕💕💕🤷‍♂️⛔⛔⛔👍👍😥😥😥😥😥😥😥😥😥😥")
        const editedUserdata = await UserModel.findOneAndUpdate({_id: req.body.id}, {
            $set: {
                username: req.body.username
            }
        }, { new: true});

        if(editedUserdata){
            res.json(editedUserdata);
        }else{
            res.json("failed editing data")
        }
    } catch (error) {
        console.log(error)
    }
})




export default router;