import { GetAllAdminsForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAllAdminsForSuperAdminController";
import { GetAnAdminForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAnAdminForSuperAdminController";
import { GetAnAdminvisitorsDataForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAnAdminvisitorsDataForSuperAdminController";
import { MongoSuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/SuperAdminRepository";
import { GetAllAdminsForSuperAdminUseCase } from "../../useCases/superAdmin/GetAllAdminsForSuperAdminUseCase";
import { GetAnAdminForSuperAdminUseCase } from "../../useCases/superAdmin/GetAnAdminForSuperAdminUseCase";
import { GetAnAdminsVisitorsForSuperAdminUseCase } from "../../useCases/superAdmin/GetAnAdminsVisitorsForSuperAdminUseCase";



const mongoRepo = new MongoSuperAdminRepository();


// -----------------------------| GET ALL ADMINS COLLECTIONS FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAllAdminsDataUse = new GetAllAdminsForSuperAdminUseCase(mongoRepo);
export const InjectedGetAllAdminsDataForSuperAdminController = new GetAllAdminsForSuperAdminController(getAllAdminsDataUse)


// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminDataUse = new GetAnAdminForSuperAdminUseCase(mongoRepo);
export const InjectedGetAnAdminForSuperAdminController = new GetAnAdminForSuperAdminController(getAnAdminDataUse)



// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAnAdminsVisitorsUse = new GetAnAdminsVisitorsForSuperAdminUseCase(mongoRepo);
export const InjectedGetAnAdminsVisitorDataForSuperAdminController = new GetAnAdminvisitorsDataForSuperAdminController(getAnAdminsVisitorsUse)