import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { SignupController } from "../../controllers/SignUpController";
import { GetUnVerifiedAdminController } from "../../controllers/GetUnverifiedAdminController";
import { UpdateUnverifiedAdminController } from "../../controllers/UpdateUnverifiedAdminController";
import { AdminLoginController } from "../../controllers/AdminLoginController";
import { GoogleAthController } from "../../controllers/GoogleOAuthController";
import {  UpdateAdminProfileController } from "../../controllers/UpdateAdminProfileController";
import { GetAdminController } from "../../controllers/GetAdminDataController";
const router: Route = Router();


// -------------------------------------| ADMIN SIGN UP-----------------------------------------------------------------------------------|
router.post("/signup", SignupController.signUpAdmin);

// -------------------------------------| GET THE UNVERIFIED ADMIN------------------------------------------------------------------------|
router.get("/unverified_admin/:phone", GetUnVerifiedAdminController.getUnverifiedAdminController);

// -------------------------------------| VERIFY THE ADMIN BY THE FIREBASE VERIFICATION ID -----------------------------------------------|
router.post("/update_firebase_verify", UpdateUnverifiedAdminController.UpdateAdminVerifyController);

// -------------------------------------| VERIFY THE ADMIN AND LOGIN ---------------------------------------------------------------------|
router.post("/admin_login", AdminLoginController.AdminLoginController);

// -------------------------------------| GOOGLE AUTHENTICATION --------------------------------------------------------------------------|
router.post("/google_oauth",  GoogleAthController.GoogleAuthController);

// -------------------------------------| UPDATE THE ADDMIN PROFILE ----------------------------------------------------------------------|
router.post("/update_admin/:id", UpdateAdminProfileController.UpdateAdminProfileData);

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID -------------------------------------------------------------|
router.get("/get_admin/:id", GetAdminController.GetAdminDataByIdController);

export default router;