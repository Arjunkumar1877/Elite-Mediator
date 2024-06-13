import { Router } from "express";
import { Route } from "../../../frameworks/types/ServerTypes";
import { JwtTokenAdapter } from "../../../frameworks/services/jwtService/TokenService";
import { InjectedAdminSignUpController, InjectedAdminlogincontroller, InjectedGenerateQrCodeController, InjectedGetAdminDataController, InjectedGetUnverifiedAdminController, InjectedGoogleLoginController, InjectedSavePropertyDataController, InjectedUpdateAdminProfileController, InjectedUpdateVerifyAdminController } from "../../../frameworks/injection/Injects";
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
router.post("/update_admin/:id",JwtToken.verifyToken,  InjectedUpdateAdminProfileController.UpdateAdminProfileData.bind(InjectedUpdateAdminProfileController));

// -------------------------------------| GET THE ADMIN DATA BY THE ADMIN ID -------------------------------------------------------------|
router.get("/get_admin/:id",JwtToken.verifyToken, InjectedGetAdminDataController.GetAdminDataByIdController.bind(InjectedGetAdminDataController));

// -------------------------------------| GET THE GENRATED ADMIN CODE --------------------------------------------------------------------|
router.get("/generate_code/:adminId/:propertyId", InjectedGenerateQrCodeController.GenerateQrCode.bind(InjectedGenerateQrCodeController));

// -------------------------------------| SAVE PROPERTY DATA AND QRCODE --------------------------------------------------------------------|
router.post("/save_property_data", InjectedSavePropertyDataController.SavePropertyDataControl.bind(InjectedSavePropertyDataController));


export default router;