"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedGetAnAdminsVisitorDataForSuperAdminController = exports.InjectedGetAnAdminForSuperAdminController = exports.InjectedGetAllAdminsDataForSuperAdminController = void 0;
const GetAllAdminsForSuperAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/GetAllAdminsForSuperAdminController");
const GetAnAdminForSuperAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/GetAnAdminForSuperAdminController");
const GetAnAdminvisitorsDataForSuperAdminController_1 = require("../../interfaceAdapters/controllers/superAdmin/GetAnAdminvisitorsDataForSuperAdminController");
const SuperAdminRepository_1 = require("../../interfaceAdapters/repositories/superAdmin/SuperAdminRepository");
const GetAllAdminsForSuperAdminUseCase_1 = require("../../useCases/superAdmin/GetAllAdminsForSuperAdminUseCase");
const GetAnAdminForSuperAdminUseCase_1 = require("../../useCases/superAdmin/GetAnAdminForSuperAdminUseCase");
const GetAnAdminsVisitorsForSuperAdminUseCase_1 = require("../../useCases/superAdmin/GetAnAdminsVisitorsForSuperAdminUseCase");
const mongoRepo = new SuperAdminRepository_1.MongoSuperAdminRepository();
// -----------------------------| GET ALL ADMINS COLLECTIONS FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAllAdminsDataUse = new GetAllAdminsForSuperAdminUseCase_1.GetAllAdminsForSuperAdminUseCase(mongoRepo);
exports.InjectedGetAllAdminsDataForSuperAdminController = new GetAllAdminsForSuperAdminController_1.GetAllAdminsForSuperAdminController(getAllAdminsDataUse);
// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminDataUse = new GetAnAdminForSuperAdminUseCase_1.GetAnAdminForSuperAdminUseCase(mongoRepo);
exports.InjectedGetAnAdminForSuperAdminController = new GetAnAdminForSuperAdminController_1.GetAnAdminForSuperAdminController(getAnAdminDataUse);
// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminsVisitorsUse = new GetAnAdminsVisitorsForSuperAdminUseCase_1.GetAnAdminsVisitorsForSuperAdminUseCase(mongoRepo);
exports.InjectedGetAnAdminsVisitorDataForSuperAdminController = new GetAnAdminvisitorsDataForSuperAdminController_1.GetAnAdminvisitorsDataForSuperAdminController(getAnAdminsVisitorsUse);
