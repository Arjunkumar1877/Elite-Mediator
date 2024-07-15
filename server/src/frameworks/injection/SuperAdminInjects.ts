import { GetAllAdminsForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAllAdminsForSuperAdminController";
import { GetAnAdminForSuperAdminController } from "../../interfaceAdapters/controllers/superAdmin/GetAnAdminForSuperAdminController";
import { MongoSuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/SuperAdminRepository";
import { GetAllAdminsForSuperAdminUseCase } from "../../useCases/superAdmin/GetAllAdminsForSuperAdminUseCase";
import { GetAnAdminForSuperAdminUseCase } from "../../useCases/superAdmin/GetAnAdminForSuperAdminUseCase";



const mongoRepo = new MongoSuperAdminRepository();


// -----------------------------| GET ALL ADMINS COLLECTIONS FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getAllAdminsDataUse = new GetAllAdminsForSuperAdminUseCase(mongoRepo);
export const InjectedGetAllAdminsDataForSuperAdminController = new GetAllAdminsForSuperAdminController(getAllAdminsDataUse)


// -----------------------------| GET AN ADMINS PROFILE DATA FOR SUPERADMIN  ----------------------------------------------------------------------------------------
const getANAdminDataUse = new GetAnAdminForSuperAdminUseCase(mongoRepo);
export const InjectedGetAnAdminForSuperAdminController = new GetAnAdminForSuperAdminController(getANAdminDataUse)