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
import { SuperAdminBlockAdminUseCase } from "../../useCases/superAdmin/SuperAdminBlockAdminUseCase";
import { SuperAdminUnblockAdminUseCase } from "../../useCases/superAdmin/SuperAdminUnblockAdminUseCase";
import { GetRegisteredPropertyOwnersandVisitorsForGraphUseCase } from "../../useCases/superAdmin/GetRegisteredPropertyOwnersandVisitorsForGraphUseCase";
import { GetRegisteredPropertyOwnersAndVisitorsController } from "../../interfaceAdapters/controllers/superAdmin/GetRegisteredPropertyOwnersAndVisitorsController";
import { GetCreatedPropertyDatasCountForGraphnUseCase } from "../../useCases/superAdmin/GetCreatedPropertyDatasCountForGraphnUseCase";
import { GetCreatedPropertyDataCountForGraphController } from "../../interfaceAdapters/controllers/superAdmin/GetCreatedPropertyDataCountForGraphController";



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

// -----------------------------| GET ALL THE POSTERS  ---------------------------------------------------------------------------------------
const getAllPostersUse = new SuperAdmnGetPostersUseCase(mongoRepo);
export const InjectedSuperAdminGetAllPostersController = new SuperAdminGetAllPostersControllers(getAllPostersUse)

// -----------------------------| SUPER ADMIN BLOCK AN ADMIN  ---------------------------------------------------------------------------------------
const superAdminBlockAdminUse = new SuperAdminBlockAdminUseCase(mongoRepo);
export const InjectedSuperAdminBlockAdminController = new SuperAdminBlockAdminController(superAdminBlockAdminUse)

// -----------------------------| SUPER ADMIN UN BLOCK AN ADMIN  ---------------------------------------------------------------------------------------
const superAdminUnblockAdminUse = new SuperAdminUnblockAdminUseCase(mongoRepo);
export const InjectedSuperAdminUnblockAdminController = new SuperAdminUnblockAdminController(superAdminUnblockAdminUse)

// -----------------------------| SUPER ADMIN UN BLOCK AN ADMIN  ---------------------------------------------------------------------------------------
const getResisteredAdminsAndVisitorsUse = new GetRegisteredPropertyOwnersandVisitorsForGraphUseCase(mongoRepo);
export const InjectedRegisteredPropertyOwnersAndVisitorsController = new GetRegisteredPropertyOwnersAndVisitorsController(getResisteredAdminsAndVisitorsUse);


// -----------------------------| SUPER ADMIN UN BLOCK AN ADMIN  ---------------------------------------------------------------------------------------
const getGEneratedQrCodesUse = new GetCreatedPropertyDatasCountForGraphnUseCase(mongoRepo);
export const InjectedGetGeneratedQrCodedatasForGraphController = new GetCreatedPropertyDataCountForGraphController(getGEneratedQrCodesUse)