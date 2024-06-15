import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateNewUserData, InjectedGetUnverifiedUserData, InjectedGetUserDataByPHone, InjectedVerifyAndUpdateUserData } from "../../../frameworks/injection/UserInjects";
const router:Route = Router();

// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_user", InjectedCreateNewUserData.UserCreateControl.bind(InjectedCreateNewUserData));


// -------------------------------------| VERIFY THE USER DATA USING FIREBASE CODE IN THE CLIENT SIDE AND UPDATE --------------------------------------------------------------------|
router.post("/user_update_verify/:id", InjectedVerifyAndUpdateUserData.VerifyAndUpdateUserControl.bind(InjectedVerifyAndUpdateUserData));


// -------------------------------------| GET THE USER DATA BY USING ID ----------------------------------------------------------------------------|
router.get("/get_user_by_id/:id", InjectedGetUnverifiedUserData.GetUnverifiedUserDataControl.bind(InjectedGetUnverifiedUserData));


// -------------------------------------| GET THE USER DATA BY USING PHONE ----------------------------------------------------------------------------|
router.post("/get_user_phone", InjectedGetUserDataByPHone.GetUserDataByPhone.bind(InjectedGetUserDataByPHone));



// router.post('/')


export default router;