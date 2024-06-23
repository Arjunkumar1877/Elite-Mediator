import { AdminLoginController } from '../../interfaceAdapters/controllers/Admin/AdminLoginController';
import { GenerateQrController } from '../../interfaceAdapters/controllers/Admin/GenerateQrCodeController';
import { GetAdminDataController } from '../../interfaceAdapters/controllers/Admin/GetAdminDataController';
import { GetAdminAllPropertyDataController } from '../../interfaceAdapters/controllers/Admin/GetAdminAllPropertyDataController';
import { GetUnverifiedAdminController } from '../../interfaceAdapters/controllers/Admin/GetUnverifiedAdminController';
import { GoogleOAthController } from '../../interfaceAdapters/controllers/Admin/GoogleOAuthController';
import { SavePropertDataController } from '../../interfaceAdapters/controllers/Admin/SavePropertyDataController';
import { AdminSignupController } from '../../interfaceAdapters/controllers/Admin/SignUpController';
import { UpdateAdminProfileController } from '../../interfaceAdapters/controllers/Admin/UpdateAdminProfileController';
import { UpdateUnverifiedAdminController } from '../../interfaceAdapters/controllers/Admin/UpdateUnverifiedAdminController';
import { MongoAdminRepository } from '../../interfaceAdapters/repositories/admin/AdminRepository';
import { AdminLoginUseCase } from '../../useCases/admin/AdminLoginUseCase';
import { AdminSignupUseCase } from '../../useCases/admin/AdminSignUseCase';
import { GetAdminDataUseCase } from '../../useCases/admin/GetAdminDataUseCase';
import { GetAdminAllPropertDataUseCase } from '../../useCases/admin/GetAdminAllPropertyDataUseCase';
import { GetUnverifiedAdminDataUsecase } from '../../useCases/admin/GetUnverifiedAdminUseCase';
import { GoogleAuthUseCase } from '../../useCases/admin/GoogleAuthUseCase';
import { SavePropertyDataUseCase } from '../../useCases/admin/SavePropertyDataUseCase';
import { UpdateAdminProfileUseCase } from '../../useCases/admin/UpdateAdminUseCase';
import { UpdateUnverifiedUseCase } from '../../useCases/admin/UpdateUnverifiedUserUseCase';
import { GenerateQrCode } from '../services/QrGenerateService/GenerateQrCode.';
import { UpdateConversationReadToZeroController } from '../../interfaceAdapters/controllers/Admin/UpdateConversationReadToZeroController';
import { UpdateConversationReadCountToZeroUseCase } from '../../useCases/admin/UpdateConversationReadCountToZeroUseCase';
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


// -----------------------------| GENERATE AND SEND QRCODE TO THE CLIENT INJECTION ----------------------------------------------------------------------------------------
const generateQrCodeUse = new GenerateQrCode();
export const InjectedGenerateQrCodeController = new GenerateQrController(generateQrCodeUse);


// -----------------------------| GENERATE AND SEND QRCODE TO THE CLIENT INJECTION ----------------------------------------------------------------------------------------
const savePropertyDataUse = new SavePropertyDataUseCase(mongoRepo);
export const InjectedSavePropertyDataController = new SavePropertDataController(savePropertyDataUse);


// -----------------------------| GET EACH ADMIN'S PROPERTY DATA AND QRCODE'S INJECTION ----------------------------------------------------------------------------------------
const getAdminPropertyDataUse = new GetAdminAllPropertDataUseCase(mongoRepo);
export const InjectedGetAdminAllPropertyDataController = new GetAdminAllPropertyDataController(getAdminPropertyDataUse);


// -----------------------------| GET EACH ADMIN'S PROPERTY DATA AND QRCODE'S INJECTION ----------------------------------------------------------------------------------------
const updateConversationReadCountUse = new UpdateConversationReadCountToZeroUseCase(mongoRepo);
export const InjectedUpdateConversationReadCountToZeroController = new UpdateConversationReadToZeroController(updateConversationReadCountUse);

