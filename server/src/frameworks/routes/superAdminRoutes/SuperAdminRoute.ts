import { Router } from "express";
import { SuperAdminLoginController } from "../../../interfaceAdapters/controllers/superAdmin/SuperAdminLoginController";
import { InjectedGetAllAdminsDataForSuperAdminController, InjectedGetAnAdminForSuperAdminController, InjectedGetAnAdminsVisitorDataForSuperAdminController } from "../../injection/SuperAdminInjects";


const router = Router();


router.post('/superadmin_login', SuperAdminLoginController.SuperAdminLoginControl);



// -------------------------------------| FETCHING ALL THE ADMIN DATA COLLECTION ---------------------------------------------------------------------------------|
router.get('/get_all_admins_data', InjectedGetAllAdminsDataForSuperAdminController.GetAllAdminForSuperAdminContol.bind(InjectedGetAllAdminsDataForSuperAdminController))


// -------------------------------------| FETCHING A SINGLE ADMIN DATA -------------------------------------------------------------------------|
router.get('/get_admin_profile/:adminId', InjectedGetAnAdminForSuperAdminController.GetAnAdminForSuperAdminControl.bind(InjectedGetAnAdminForSuperAdminController))


// -------------------------------------| GET THE VISITORS OF AN ADMIN -------------------------------------------------------------------------|
router.post('/get_admin_visitors', InjectedGetAnAdminsVisitorDataForSuperAdminController.GetAnAdminsVisitorsConrol.bind(InjectedGetAnAdminsVisitorDataForSuperAdminController))





export default router;