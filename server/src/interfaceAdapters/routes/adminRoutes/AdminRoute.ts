import { Router } from "express";
import { Route } from "../../../entities/types/ServerTypes";
import { AdminController } from "../../controllers/adminController";
const router: Route = Router();


router.post("/signup", AdminController.signUpAdmin);
router.get("/unverified_admin/:phone", AdminController.getUnverifiedAdminController);
router.post("/update_unverified_admin", AdminController.updateUnverifiedAdminController);

export default router;