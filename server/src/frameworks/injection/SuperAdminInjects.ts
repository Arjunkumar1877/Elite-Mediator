import { GetAllAdminsForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAllAdminsForSuperAdminController";
import { GetAnAdminForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAnAdminForSuperAdminController";
import { GetAnAdminvisitorsDataForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAnAdminvisitorsDataForSuperAdminController";
import { SuperAdminAddNewPosterController } from "../../interfaceAdapters/controllers/superAdmin/SuperAdminAddNewPosterController";
import { SuperAdminBlockAdminController } from "../../interfaceAdapters/controllers/superAdmin/SuperAdminBlockAdminController";
import { SuperAdminGetAllPostersControllers } from "../../interfaceAdapters/controllers/superAdmin/SuperAdminGetAllPostersControllers";
import { SuperAdminLoginController } from "../../interfaceAdapters/controllers/superAdmin/SuperAdminLoginController";
import { SuperAdminUnblockAdminController } from "../../interfaceAdapters/controllers/superAdmin/SuperAdminUnblockAdminController";
import { MongoSuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/SuperAdminRepository";
import { GetAllAdminsForSuperAdminUseCase } from "../../useCases/superAdmin/GetAllAdminsForSuperAdminUseCase";
import { GetAnAdminForSuperAdminUseCase } from "../../useCases/superAdmin/GetAnAdminForSuperAdminUseCase";
import { GetAnAdminsVisitorsForSuperAdminUseCase } from "../../useCases/superAdmin/GetAnAdminsVisitorsForSuperAdminUseCase";
import { SuperAdminAddNewPosterUseCase } from "../../useCases/superAdmin/SuperAdminAddNewPosterUseCase";
import { SuperAdminLoginUseCase } from "../../useCases/superAdmin/SuperAdminLoginUsecase";
import { SuperAdmnGetPostersUseCase } from "../../useCases/superAdmin/SuperAdmnGetPostersUseCase";
import { SuperAdminBlockAdminUseCase } from "../../useCases/user/SuperAdminBlockAdminUseCase";
import { SuperAdminUnblockAdminUseCase } from "../../useCases/user/SuperAdminUnblockAdminUseCase";



const mongoRepo = new MongoSuperAdminRepository();

// -----------------------------| SUPER ADMIN LOGIN  ----------------------------------------------------------------------------------------
const loginSuperAdminUse = new SuperAdminLoginUseCase(mongoRepo);
export const InjectedSuperAdminloginController = new SuperAdminLoginController(loginSuperAdminUse)


// -----------------------------| GET ALL ADMINS COLLECTIONS FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAllAdminsDataUse = new GetAllAdminsForSuperAdminUseCase(mongoRepo);
export const InjectedGetAllAdminsDataForSuperAdminController = new GetAllAdminsForSuperAdminController(getAllAdminsDataUse)


// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminDataUse = new GetAnAdminForSuperAdminUseCase(mongoRepo);
export const InjectedGetAnAdminForSuperAdminController = new GetAnAdminForSuperAdminController(getAnAdminDataUse)


// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminsVisitorsUse = new GetAnAdminsVisitorsForSuperAdminUseCase(mongoRepo);
export const InjectedGetAnAdminsVisitorDataForSuperAdminController = new GetAnAdminvisitorsDataForSuperAdminController(getAnAdminsVisitorsUse)


// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const AddNewPosterUse = new SuperAdminAddNewPosterUseCase(mongoRepo);
export const InjectedSuperAdminAddNewPosterController = new SuperAdminAddNewPosterController(AddNewPosterUse);

// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const getAllPostersUse = new SuperAdmnGetPostersUseCase(mongoRepo);
export const InjectedSuperAdminGetAllPostersController = new SuperAdminGetAllPostersControllers(getAllPostersUse)

// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const superAdminBlockAdminUse = new SuperAdminBlockAdminUseCase(mongoRepo);
export const InjectedSuperAdminBlockAdminController = new SuperAdminBlockAdminController(superAdminBlockAdminUse)

// -----------------------------| EDIT AND ADD NEW POSTERS  ---------------------------------------------------------------------------------------
const superAdminUnblockAdminUse = new SuperAdminUnblockAdminUseCase(mongoRepo);
export const InjectedSuperAdminUnblockAdminController = new SuperAdminUnblockAdminController(superAdminUnblockAdminUse)