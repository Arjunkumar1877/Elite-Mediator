import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateConversationController, InjectedCreateNewUserDataController, InjectedGetAdminsPropertdataController, InjectedGetUnverifiedUserDataController, InjectedGetUserDataByPhoneController, InjectedVerifyAndUpdateUserDataController } from "../../../frameworks/injection/UserInjects";
import { ConversationModel } from "../../../frameworks/database/models/admin/ConversationModel";
import { MessageModel } from "../../../frameworks/database/models/admin/MessageModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { InjectedGetMessagesController, InjectedSendMesssage } from "../../../frameworks/injection/CommonInjects";
import { CallModel } from "../../database/models/admin/CallModel";
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
})


// Start a call
router.post('/start_call', async (req, res) => {
  try {
    console.log(req.body);

    const callerData = await CallModel.create(req.body);

    if (callerData) {
      res.json(callerData);
    }
  } catch (error: any) {
    console.error('Error starting call:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Decline a call
router.post('/decline_call/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const call = await CallModel.findById(id);

    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }

    const update = await CallModel.findByIdAndUpdate(
      id,
      { callStatus: 'declined' },
      { new: true }
    );

if(update){
  console.log("call declined📉📉📉📉📉😥😥😥❤️❤️❤️✌️✌️😣😣😣😂😂⛔💕💕🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️ ")

}


    res.json(update);
  } catch (error: any) {
    console.error('Error declining call:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Accept a call
router.post('/accept_call/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const update = await CallModel.findByIdAndUpdate(
      id,
      {
        callStarted: Date.now(),
        callStatus: 'answered',
      },
      { new: true }
    );

    res.json(update);
  } catch (error: any) {
    console.error('Error accepting call:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Disconnect a call
router.post('/disconnect_call/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const call = await CallModel.findById(id);

    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }

    const callEnded = new Date();
    const callStarted = call.callStarted ? new Date(call.callStarted).getTime() : 0;
    const callDuration = callStarted ? callEnded.getTime() - callStarted : 0;

    const update = await CallModel.findByIdAndUpdate(
      id,
      {
        callEnded: callEnded,
        callDuration: callDuration,
      },
      { new: true }
    );

    res.json(update);
  } catch (error: any) {
    console.error('Error disconnecting call:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


router.get("/get_calls/:id", async(req,res)=>{
  try {
    const id = req.params.id;

    const calles = await CallModel.find({adminId: id}).populate('userId').sort({createdAt: -1});
    res.json(calles);
    
  } catch (error: any) {
    console.log(error)
  }
})




export default router;