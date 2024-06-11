import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { SignupController } from "../../controllers/Admin/SignUpController";
import { GetUnVerifiedAdminController } from "../../controllers/Admin/GetUnverifiedAdminController";
import { UpdateUnverifiedAdminController } from "../../controllers/Admin/UpdateUnverifiedAdminController";
import { GoogleAthController } from "../../controllers/Admin/GoogleOAuthController";
import { UpdateAdminProfileController } from "../../controllers/Admin/UpdateAdminProfileController";
import { GetAdminController } from "../../controllers/Admin/GetAdminDataController";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { AdminLoginController } from "../../controllers/Admin/AdminLoginController";
const router: Route = Router();

const JwtToken = new JwtTokenAdapter();

// -------------------------------------| ADMIN SIGN UP-----------------------------------------------------------------------------------|
router.post("/signup", SignupController.signUpAdmin);

// -------------------------------------| GET THE UNVERIFIED ADMIN------------------------------------------------------------------------|
router.get("/unverified_admin/:phone", GetUnVerifiedAdminController.getUnverifiedAdminController);

// -------------------------------------| VERIFY THE ADMIN BY THE FIREBASE VERIFICATION ID -----------------------------------------------|
router.post("/update_firebase_verify", UpdateUnverifiedAdminController.UpdateAdminVerifyController);

// -------------------------------------| VERIFY THE ADMIN AND LOGIN ---------------------------------------------------------------------|
router.post("/admin_login", AdminLoginController.AdminLoginController);

// -------------------------------------| GOOGLE AUTHENTICATION --------------------------------------------------------------------------|
router.post("/google_oauth",JwtToken.CreateJwtToken,  GoogleAthController.GoogleAuthController);

// -------------------------------------| UPDATE THE ADDMIN PROFILE ----------------------------------------------------------------------|
router.post("/update_admin/:id",JwtToken.verifyToken,  UpdateAdminProfileController.UpdateAdminProfileData);

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID -------------------------------------------------------------|
router.get("/get_admin/:id",JwtToken.verifyToken, GetAdminController.GetAdminDataByIdController);

export default router;