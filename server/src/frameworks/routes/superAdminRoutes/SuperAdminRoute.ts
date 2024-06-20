import { Router } from "express";
import { SuperAdminLoginController } from "../../../interfaceAdapters/controllers/superAdmin/SuperAdminLoginController";

const router = Router();


router.post('/superadmin_login', SuperAdminLoginController.SuperAdminLoginControl);


export default router;