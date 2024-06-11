import { AdminLoginController } from '../../interfaceAdapters/controllers/Admin/AdminLoginController';
import { GetAdminDataController } from '../../interfaceAdapters/controllers/Admin/GetAdminDataController';
import { GetUnverifiedAdminController } from '../../interfaceAdapters/controllers/Admin/GetUnverifiedAdminController';
import { GoogleOAthController } from '../../interfaceAdapters/controllers/Admin/GoogleOAuthController';
import { AdminSignupController } from '../../interfaceAdapters/controllers/Admin/SignUpController';
import { UpdateAdminProfileController } from '../../interfaceAdapters/controllers/Admin/UpdateAdminProfileController';
import { UpdateUnverifiedAdminController } from '../../interfaceAdapters/controllers/Admin/UpdateUnverifiedAdminController';
import { MongoAdminRepository } from '../../interfaceAdapters/repositories/admin/AdminRepository';
import { AdminLoginUseCase } from '../../useCases/Admin/AdminLoginUseCase';
import { AdminSignupUseCase } from '../../useCases/Admin/AdminSignUseCase';
import { GetAdminDataUseCase } from '../../useCases/Admin/GetAdminDataUseCase';
import { GetUnverifiedAdminDataUsecase } from '../../useCases/Admin/GetUnverifiedAdminUseCase';
import { GoogleAuthUseCase } from '../../useCases/Admin/GoogleAuthUseCase';
import { UpdateAdminProfileUseCase } from '../../useCases/Admin/UpdateAdminUseCase';
import { UpdateUnverifiedUseCase } from '../../useCases/Admin/UpdateUnverifiedUserUseCase';
const mongoRepo = new MongoAdminRepository();

// -----------------------------| ADMIN SIGNUP INJECTION ----------------------------------------------------------------------------------------
const adminSignupUse = new AdminSignupUseCase(mongoRepo);
export const InjectedAdminSignUpController = new AdminSignupController(adminSignupUse);


// -----------------------------| ADMIN LOGIN VERIFY INJECTION ----------------------------------------------------------------------------------------
const getUnverifiedAdminUse = new GetUnverifiedAdminDataUsecase(mongoRepo);
export const InjectedGetUnverifiedAdminController = new GetUnverifiedAdminController(getUnverifiedAdminUse);

// -----------------------------| ADMIN LOGIN VERIFY INJECTION ----------------------------------------------------------------------------------------
const adminGoogleLoginUse = new GoogleAuthUseCase(mongoRepo);
export const InjectedGoogleLoginController = new GoogleOAthController(adminGoogleLoginUse);


// -----------------------------| VERIFY AND UPDATE ADMIN BY FIRBASE BASE CODE INJECTION ----------------------------------------------------------------------------------------
const updateVerifyAdminUse = new UpdateUnverifiedUseCase(mongoRepo);
export const InjectedUpdateVerifyAdminController = new UpdateUnverifiedAdminController(updateVerifyAdminUse);


// -----------------------------| ADMIN LOGIN VERIFY INJECTION ----------------------------------------------------------------------------------------
const adminLoginUse = new AdminLoginUseCase(mongoRepo);
export const InjectedAdminlogincontroller = new AdminLoginController(adminLoginUse);


// -----------------------------| UPDATE ADMIN PROFILE DETAILS INJECTION ----------------------------------------------------------------------------------------
const adminProfileUpdateUse = new UpdateAdminProfileUseCase(mongoRepo);
export const InjectedUpdateAdminProfileController = new UpdateAdminProfileController(adminProfileUpdateUse);


// -----------------------------| UPDATE ADMIN PROFILE DETAILS INJECTION ----------------------------------------------------------------------------------------
const getAdminDataByIdUse = new GetAdminDataUseCase(mongoRepo);
export const InjectedGetAdminDataController = new GetAdminDataController(getAdminDataByIdUse);


