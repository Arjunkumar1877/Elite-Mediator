"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SuperAdminInjects_1 = require("../../injection/SuperAdminInjects");
const router = (0, express_1.Router)();
// -------------------------------------| SUPER ADMIN LOGIN  ---------------------------------------------------------------------------------|
router.post('/super_admin_login', SuperAdminInjects_1.InjectedSuperAdminloginController.SuperAdminLoginControl.bind(SuperAdminInjects_1.InjectedSuperAdminloginController));
// -------------------------------------| FETCHING ALL THE ADMIN DATA COLLECTION ---------------------------------------------------------------------------------|
router.get('/get_all_admins_data', SuperAdminInjects_1.InjectedGetAllAdminsDataForSuperAdminController.GetAllAdminForSuperAdminContol.bind(SuperAdminInjects_1.InjectedGetAllAdminsDataForSuperAdminController));
// -------------------------------------| FETCHING A SINGLE ADMIN DATA -------------------------------------------------------------------------|
router.get('/get_admin_profile/:adminId', SuperAdminInjects_1.InjectedGetAnAdminForSuperAdminController.GetAnAdminForSuperAdminControl.bind(SuperAdminInjects_1.InjectedGetAnAdminForSuperAdminController));
// -------------------------------------| GET THE VISITORS OF AN ADMIN -------------------------------------------------------------------------|
router.post('/get_admin_visitors', SuperAdminInjects_1.InjectedGetAnAdminsVisitorDataForSuperAdminController.GetAnAdminsVisitorsConrol.bind(SuperAdminInjects_1.InjectedGetAnAdminsVisitorDataForSuperAdminController));
// -------------------------------------| ADD A NEW POSTER BY REMOVING THE EXISTING ONE -------------------------------------------------------------------------|
router.post('/add_new_poster', SuperAdminInjects_1.InjectedSuperAdminAddNewPosterController.SuperAdminAddNewPOsterControl.bind(SuperAdminInjects_1.InjectedSuperAdminAddNewPosterController));
// -------------------------------------| FETCHING ALL THE EXISTING POSTERS -------------------------------------------------------------------------|
router.get('/get_posters', SuperAdminInjects_1.InjectedSuperAdminGetAllPostersController.SuperAdminGetAllPOstersControl.bind(SuperAdminInjects_1.InjectedSuperAdminGetAllPostersController));
// -------------------------------------| BLOCK AN ADMIN BY THE SUPER ADMIN -------------------------------------------------------------------------|
router.get("/block_an_admin/:adminId", SuperAdminInjects_1.InjectedSuperAdminBlockAdminController.SuperAdminBlockAdminControl.bind(SuperAdminInjects_1.InjectedSuperAdminBlockAdminController));
// -------------------------------------| UBLOCK AN ADMIN BY THE SUPER ADMIN -------------------------------------------------------------------------|
router.get("/unblock_an_admin/:adminId", SuperAdminInjects_1.InjectedSuperAdminUnblockAdminController.SuperAdminUnblockAdminControl.bind(SuperAdminInjects_1.InjectedSuperAdminUnblockAdminController));
// -------------------------------------| GET ALL REGISTERED ADMIN AND VISITORS FOR THE SUPER ADMIN GRAPH IN DASHBOARD -------------------------------------------------------------------------|
router.get('/admin_and_visitors_count', SuperAdminInjects_1.InjectedRegisteredPropertyOwnersAndVisitorsController.GetPropertyOwnersAndVisitorsControl.bind(SuperAdminInjects_1.InjectedRegisteredPropertyOwnersAndVisitorsController));
// -------------------------------------| GET ALL GENERATED QR CODES FOR THE SUPER ADMIN GRAPH IN DASHBOARD -------------------------------------------------------------------------|
router.get('/admin_generated_qrcodes', SuperAdminInjects_1.InjectedGetGeneratedQrCodedatasForGraphController.GetGeneratedPropertyDataCountControl.bind(SuperAdminInjects_1.InjectedGetGeneratedQrCodedatasForGraphController));
exports.default = router;
