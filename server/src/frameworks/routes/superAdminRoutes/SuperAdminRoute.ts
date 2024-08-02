import { Router } from "express";
import { InjectedGetAllAdminsDataForSuperAdminController, InjectedGetAnAdminForSuperAdminController, InjectedGetAnAdminsVisitorDataForSuperAdminController, InjectedGetGeneratedQrCodedatasForGraphController, InjectedRegisteredPropertyOwnersAndVisitorsController, InjectedSuperAdminAddNewPosterController, InjectedSuperAdminBlockAdminController, InjectedSuperAdminGetAllPostersController, InjectedSuperAdminloginController, InjectedSuperAdminUnblockAdminController } from "../../injection/SuperAdminInjects";
import { Route } from "../../types/ServerTypes";


const router: Route = Router();

// -------------------------------------| SUPER ADMIN LOGIN  ---------------------------------------------------------------------------------|
router.post('/super_admin_login', InjectedSuperAdminloginController.SuperAdminLoginControl.bind(InjectedSuperAdminloginController));

// -------------------------------------| FETCHING ALL THE ADMIN DATA COLLECTION ---------------------------------------------------------------------------------|
router.get('/get_all_admins_data', InjectedGetAllAdminsDataForSuperAdminController.GetAllAdminForSuperAdminContol.bind(InjectedGetAllAdminsDataForSuperAdminController))

// -------------------------------------| FETCHING A SINGLE ADMIN DATA -------------------------------------------------------------------------|
router.get('/get_admin_profile/:adminId', InjectedGetAnAdminForSuperAdminController.GetAnAdminForSuperAdminControl.bind(InjectedGetAnAdminForSuperAdminController))

// -------------------------------------| GET THE VISITORS OF AN ADMIN -------------------------------------------------------------------------|
router.post('/get_admin_visitors', InjectedGetAnAdminsVisitorDataForSuperAdminController.GetAnAdminsVisitorsConrol.bind(InjectedGetAnAdminsVisitorDataForSuperAdminController))

// -------------------------------------| ADD A NEW POSTER BY REMOVING THE EXISTING ONE -------------------------------------------------------------------------|
router.post('/add_new_poster', InjectedSuperAdminAddNewPosterController.SuperAdminAddNewPOsterControl.bind(InjectedSuperAdminAddNewPosterController));

// -------------------------------------| FETCHING ALL THE EXISTING POSTERS -------------------------------------------------------------------------|
router.get('/get_posters', InjectedSuperAdminGetAllPostersController.SuperAdminGetAllPOstersControl.bind(InjectedSuperAdminGetAllPostersController));

// -------------------------------------| BLOCK AN ADMIN BY THE SUPER ADMIN -------------------------------------------------------------------------|
router.get("/block_an_admin/:adminId", InjectedSuperAdminBlockAdminController.SuperAdminBlockAdminControl.bind(InjectedSuperAdminBlockAdminController))

// -------------------------------------| UBLOCK AN ADMIN BY THE SUPER ADMIN -------------------------------------------------------------------------|
router.get("/unblock_an_admin/:adminId", InjectedSuperAdminUnblockAdminController.SuperAdminUnblockAdminControl.bind(InjectedSuperAdminUnblockAdminController))

// -------------------------------------| GET ALL REGISTERED ADMIN AND VISITORS FOR THE SUPER ADMIN GRAPH IN DASHBOARD -------------------------------------------------------------------------|
router.get('/admin_and_visitors_count', InjectedRegisteredPropertyOwnersAndVisitorsController.GetPropertyOwnersAndVisitorsControl.bind(InjectedRegisteredPropertyOwnersAndVisitorsController));

// -------------------------------------| GET ALL GENERATED QR CODES FOR THE SUPER ADMIN GRAPH IN DASHBOARD -------------------------------------------------------------------------|
router.get('/admin_generated_qrcodes', InjectedGetGeneratedQrCodedatasForGraphController.GetGeneratedPropertyDataCountControl.bind(InjectedGetGeneratedQrCodedatasForGraphController));





export default router;