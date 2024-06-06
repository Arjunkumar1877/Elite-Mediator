import { Router } from "express";
import { Route } from "../../../entities/types/ServerTypes";
import { AdminController } from "../../controllers/adminController";
const router: Route = Router();


router.post("/signup", AdminController.signUpAdmin);
router.get("/unverified_admin/:phone", AdminController.getUnverifiedAdminController);
router.post("/update_firebase_verify", AdminController.updateUnverifiedAdminController);
router.post("/admin_login", AdminController.loginVerifyAdminController);
router.post("/google_oauth", AdminController.GoogleLoginController);

export default router;