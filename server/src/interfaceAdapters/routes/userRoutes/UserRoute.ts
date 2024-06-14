import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { InjectedCreateNewUserData } from "../../../frameworks/injection/UserInjects";
const router:Route = Router();

// -------------------------------------| GET ADMINS PROPERTY DATA AND QRCODE --------------------------------------------------------------------|
router.post("/create_user", InjectedCreateNewUserData.UserCreateControl.bind(InjectedCreateNewUserData));



export default router;