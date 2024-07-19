"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedSuperAdminUnblockAdminController = exports.InjectedSuperAdminBlockAdminController = exports.InjectedSuperAdminGetAllPostersController = exports.InjectedSuperAdminAddNewPosterController = exports.InjectedGetAnAdminsVisitorDataForSuperAdminController = exports.InjectedGetAnAdminForSuperAdminController = exports.InjectedGetAllAdminsDataForSuperAdminController = exports.InjectedSuperAdminloginController = void 0;
const GetAllAdminsForSuperAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/GetAllAdminsForSuperAdminController");
const GetAnAdminForSuperAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/GetAnAdminForSuperAdminController");
const GetAnAdminvisitorsDataForSuperAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/GetAnAdminvisitorsDataForSuperAdminController");
const SuperAdminAddNewPosterController_1 = require("../../interfaceAdapters/controllers/superAdmin/SuperAdminAddNewPosterController");
const SuperAdminBlockAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/SuperAdminBlockAdminController");
const SuperAdminGetAllPostersControllers_1 = require("../../interfaceAdapters/controllers/superAdmin/SuperAdminGetAllPostersControllers");
const SuperAdminLoginController_1 = require("../../interfaceAdapters/controllers/superAdmin/SuperAdminLoginController");
const SuperAdminUnblockAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/SuperAdminUnblockAdminController");
const SuperAdminRepository_1 = require("../../interfaceAdapters/repositories/superAdmin/SuperAdminRepository");
const GetAllAdminsForSuperAdminUseCase_1 = require("../../useCases/superAdmin/GetAllAdminsForSuperAdminUseCase");
const GetAnAdminForSuperAdminUseCase_1 = require("../../useCases/superAdmin/GetAnAdminForSuperAdminUseCase");
const GetAnAdminsVisitorsForSuperAdminUseCase_1 = require("../../useCases/superAdmin/GetAnAdminsVisitorsForSuperAdminUseCase");
const SuperAdminAddNewPosterUseCase_1 = require("../../useCases/superAdmin/SuperAdminAddNewPosterUseCase");
const SuperAdminLoginUsecase_1 = require("../../useCases/superAdmin/SuperAdminLoginUsecase");
const SuperAdmnGetPostersUseCase_1 = require("../../useCases/superAdmin/SuperAdmnGetPostersUseCase");
const SuperAdminBlockAdminUseCase_1 = require("../../useCases/user/SuperAdminBlockAdminUseCase");
const SuperAdminUnblockAdminUseCase_1 = require("../../useCases/user/SuperAdminUnblockAdminUseCase");
const mongoRepo = new SuperAdminRepository_1.MongoSuperAdminRepository();
// -----------------------------| SUPER ADMIN LOGIN  ----------------------------------------------------------------------------------------
const loginSuperAdminUse = new SuperAdminLoginUsecase_1.SuperAdminLoginUseCase(mongoRepo);
exports.InjectedSuperAdminloginController = new SuperAdminLoginController_1.SuperAdminLoginController(loginSuperAdminUse);
// -----------------------------| GET ALL ADMINS COLLECTIONS FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAllAdminsDataUse = new GetAllAdminsForSuperAdminUseCase_1.GetAllAdminsForSuperAdminUseCase(mongoRepo);
exports.InjectedGetAllAdminsDataForSuperAdminController = new GetAllAdminsForSuperAdminController_1.GetAllAdminsForSuperAdminController(getAllAdminsDataUse);
// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminDataUse = new GetAnAdminForSuperAdminUseCase_1.GetAnAdminForSuperAdminUseCase(mongoRepo);
exports.InjectedGetAnAdminForSuperAdminController = new GetAnAdminForSuperAdminController_1.GetAnAdminForSuperAdminController(getAnAdminDataUse);
// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminsVisitorsUse = new GetAnAdminsVisitorsForSuperAdminUseCase_1.GetAnAdminsVisitorsForSuperAdminUseCase(mongoRepo);
exports.InjectedGetAnAdminsVisitorDataForSuperAdminController = new GetAnAdminvisitorsDataForSuperAdminController_1.GetAnAdminvisitorsDataForSuperAdminController(getAnAdminsVisitorsUse);
// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const AddNewPosterUse = new SuperAdminAddNewPosterUseCase_1.SuperAdminAddNewPosterUseCase(mongoRepo);
exports.InjectedSuperAdminAddNewPosterController = new SuperAdminAddNewPosterController_1.SuperAdminAddNewPosterController(AddNewPosterUse);
// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const getAllPostersUse = new SuperAdmnGetPostersUseCase_1.SuperAdmnGetPostersUseCase(mongoRepo);
exports.InjectedSuperAdminGetAllPostersController = new SuperAdminGetAllPostersControllers_1.SuperAdminGetAllPostersControllers(getAllPostersUse);
// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const superAdminBlockAdminUse = new SuperAdminBlockAdminUseCase_1.SuperAdminBlockAdminUseCase(mongoRepo);
exports.InjectedSuperAdminBlockAdminController = new SuperAdminBlockAdminController_1.SuperAdminBlockAdminController(superAdminBlockAdminUse);
// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const superAdminUnblockAdminUse = new SuperAdminUnblockAdminUseCase_1.SuperAdminUnblockAdminUseCase(mongoRepo);
exports.InjectedSuperAdminUnblockAdminController = new SuperAdminUnblockAdminController_1.SuperAdminUnblockAdminController(superAdminUnblockAdminUse);
