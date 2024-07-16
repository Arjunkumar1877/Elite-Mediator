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
import { GetSelectedConversationUseCase } from '../../useCases/admin/GetSelectedConversationUseCase';
import { GetSelectedConversationController } from '../../interfaceAdapters/controllers/Admin/GetSelectedConversationController';
import { GetConversationListUseCase } from '../../useCases/admin/GetConversationListUseCase';
import { GetAdminConversationListController } from '../../interfaceAdapters/controllers/Admin/GetAdminConversationListController';
import { GetAdminCallListUseCase } from '../../useCases/admin/GetAdminCallListUseCase';
import { GetAdminsCallListController } from '../../interfaceAdapters/controllers/Admin/GetAdminsCallListController';
import { GetUsersListUseCase } from '../../useCases/admin/GetUsersListUseCase';
import { GetUsersListController } from '../../interfaceAdapters/controllers/Admin/GetUsersListController';
import { ClearAdminChatUseCase } from '../../useCases/admin/ClearAdminChatUseCase';
import { ClearAdminChatMessagesController } from '../../interfaceAdapters/controllers/Admin/ClearAdminChatMessagesController';
import { EditUnknownUsernameUseCase } from '../../useCases/admin/EditUnknownUsernameUseCase';
import { EditUnknownUsername } from '../../interfaceAdapters/controllers/Admin/EditUnknownUsername';
import { AddAdminFcmTokenUseCase } from '../../useCases/admin/AddAdminFcmTokenUseCase';
import { AddAdminFcmTokenController } from '../../interfaceAdapters/controllers/Admin/AddAdminFcmTokenController';
import { SendAndCreateAdminMessageUseCase } from '../../useCases/admin/SendAndCreateAdminMessageUseCase';
import { SendAdminMessageController } from '../../interfaceAdapters/controllers/Admin/SendAdminMessageController';
import { UserStatisticsGraphDataUseCase } from '../../useCases/admin/UserStatisticsGraphDataUseCase';
import { GetUserStatisticsGraphDataController } from '../../interfaceAdapters/controllers/Admin/GetUserStatisticsGraphDataController';
import { GetAdminPropertDataForFilteringController } from '../../interfaceAdapters/controllers/Admin/GetAdminPropertDataForFilteringController';
import { GetAdminPropertyDataForFilterUseCase } from '../../useCases/admin/GetAdminPropertyDataForFilterUseCase';
import { DeleteUserDataUseCase } from '../../useCases/admin/DeleteUserDataUseCase';
import { DeleteUserDataAndConversationController } from '../../interfaceAdapters/controllers/Admin/DeleteUserDataAndConversationController';
import { AdminCallingFunctionalitesUseCase } from '../../useCases/admin/AdminCallingFunctionalitesUseCase';
import { AdminCallingFunctionalitiesController } from '../../interfaceAdapters/controllers/Admin/AdminCallingFunctionalitiesController';
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


// -----------------------------|GET ADMIN PROFILE DETAILS INJECTION ----------------------------------------------------------------------------------------
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
const getAdminPropertyDataForFilterUse = new GetAdminPropertyDataForFilterUseCase(mongoRepo);
export const InjectedGetAdminPropertyDataForFilteringController = new GetAdminPropertDataForFilteringController(getAdminPropertyDataForFilterUse);



// -----------------------------| GET EACH ADMIN'S PROPERTY DATA AND QRCODE'S INJECTION ----------------------------------------------------------------------------------------
const updateConversationReadCountUse = new UpdateConversationReadCountToZeroUseCase(mongoRepo);
export const InjectedUpdateConversationReadCountToZeroController = new UpdateConversationReadToZeroController(updateConversationReadCountUse);


// -----------------------------| GET ADMIN'S SELECTED CONVERSATION INJECTION ----------------------------------------------------------------------------------------
const getSelectedConversationUse = new GetSelectedConversationUseCase(mongoRepo);
export const InjectedGetSelectedConversationController = new GetSelectedConversationController(getSelectedConversationUse);


// -----------------------------| GET ADMIN'S SELECTED CONVERSATION INJECTION ----------------------------------------------------------------------------------------
const getConversationListUse = new GetConversationListUseCase(mongoRepo);
export const InjectedGetConversationListController = new GetAdminConversationListController(getConversationListUse);


// -----------------------------| GET ADMIN'S  CALL LIST INJECTION ----------------------------------------------------------------------------------------
const getAdminsCallListUse = new GetAdminCallListUseCase(mongoRepo);
export const InjectedGetAdminsCallListController = new GetAdminsCallListController(getAdminsCallListUse);


// -----------------------------| GET VISITORS  LIST INJECTION ----------------------------------------------------------------------------------------
const getUsersListUse = new GetUsersListUseCase(mongoRepo);
export const InjectedGetUsersListController = new GetUsersListController(getUsersListUse);


// -----------------------------| CLEAR ADMIN CHAT MESSAGES ----------------------------------------------------------------------------------------
const clearAdminChatMessagesUse = new ClearAdminChatUseCase(mongoRepo);
export const InjectedClearAdminChatMessagesController = new ClearAdminChatMessagesController(clearAdminChatMessagesUse);


// -----------------------------| CLEAR ADMIN CHAT MESSAGES ----------------------------------------------------------------------------------------
const editUnknownUsernameUse = new EditUnknownUsernameUseCase(mongoRepo);
export const InjectedEditUnknownUsernameController = new EditUnknownUsername(editUnknownUsernameUse);


// -----------------------------| ADD A NEW FCM TOKEN OR GET THE EXSISTING ONE ----------------------------------------------------------------------------------------
const AddNewFcmTokenOrGetExsistingOneUse = new AddAdminFcmTokenUseCase(mongoRepo);
export const InjectedAddNewFcmTokenOrGetExsistingeController = new AddAdminFcmTokenController(AddNewFcmTokenOrGetExsistingOneUse);


// -----------------------------| ADD A NEW FCM TOKEN OR GET THE EXSISTING ONE ----------------------------------------------------------------------------------------
const sendAdminMessageUse = new SendAndCreateAdminMessageUseCase(mongoRepo);
export const InjectedSendAdminMessageController = new SendAdminMessageController(sendAdminMessageUse);


// -----------------------------| GET USER DAT ASTATISTICS FOR THE ADMIN DASHBOARD ----------------------------------------------------------------------------------------
const userStatisticsDataUse = new UserStatisticsGraphDataUseCase(mongoRepo);
export const InjectedUserStatisticsGraphController = new GetUserStatisticsGraphDataController(userStatisticsDataUse);



// -----------------------------| GET USER DAT ASTATISTICS FOR THE ADMIN DASHBOARD ----------------------------------------------------------------------------------------
const deleteUserDataUse = new DeleteUserDataUseCase(mongoRepo);
export const InjectedDeleteUserDataAndConversationController = new DeleteUserDataAndConversationController(deleteUserDataUse);



// -----------------------------| CALLING FUNCTIONALITIES FROM ADMIN TO THE USER ----------------------------------------------------------------------------------------
const adminCallFunctionalitiesUse = new AdminCallingFunctionalitesUseCase(mongoRepo);
export const InjectedAdminCallFunctionalitiesController = new AdminCallingFunctionalitiesController(adminCallFunctionalitiesUse);

