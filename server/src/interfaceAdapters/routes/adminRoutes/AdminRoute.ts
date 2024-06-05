import { Router } from "express";
import { Route } from "../../../frameworks/server/types/ServerTypes";
import { AdminController } from "../../controllers/adminController";
const router: Route = Router();


router.post("/signup", AdminController.signUpAdmin);

export default router;