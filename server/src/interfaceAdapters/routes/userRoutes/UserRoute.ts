import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateNewUserData, InjectedGetUnverifiedUserData } from "../../../frameworks/injection/UserInjects";
const router:Route = Router();

// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.post("/create_user", InjectedCreateNewUserData.UserCreateControl.bind(InjectedCreateNewUserData));


// -------------------------------------| SAVE NEW USER DATA INTO THE DATABASE --------------------------------------------------------------------|
router.get("/user_update_firebase_verify", InjectedCreateNewUserData.UserCreateControl.bind(InjectedCreateNewUserData));


// -------------------------------------| GET THE UNVERIFIED USER DATA ----------------------------------------------------------------------------|
router.get("/unverified_user/:id", InjectedGetUnverifiedUserData.GetUnverifiedUserDataControl.bind(InjectedGetUnverifiedUserData));

export default router;