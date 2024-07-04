import { CheckAndSaveUnknownUserController } from "../../interfaceAdapters/controllers/user/CheckAndSaveUnknownUserController";
import { CreateConversationController } from "../../interfaceAdapters/controllers/user/CreateConversationController";
import { CreateUserController } from "../../interfaceAdapters/controllers/user/CreateUserController";
import { GetAdminsPropertyDataController } from "../../interfaceAdapters/controllers/user/GetAdminsPropertyDataController";
import { GetUserDataByIdController } from "../../interfaceAdapters/controllers/user/GetUserDataByIdController";
import { GetUserDataByPhoneController } from "../../interfaceAdapters/controllers/user/GetUserDataByPhoneController";
import { VerifyAndUpdateUserController } from "../../interfaceAdapters/controllers/user/UserVerifyAndUpdateController";
import { MongoUserRepository } from "../../interfaceAdapters/repositories/user/UserRepository";
import { CheckAndSaveUnknownUserUseCase } from "../../useCases/user/CheckAndSaveUnknownUserUseCase";
import { CheckExisitingUserUseCase } from "../../useCases/user/CheckExisitingUserUseCase";
import { CreateConversationUseCase } from "../../useCases/user/CreateConversationUseCase";
import { GetAdminsPropertDataUseCase } from "../../useCases/user/GetAdminsPropertDataUseCase";
import { GetUserDataByIdUseCase } from "../../useCases/user/GetUserDataByIdUseCase";
import { GetUserDataByPhoneUseCase } from "../../useCases/user/GetUserDataByPhoneUseCase";
import { SaveNewUserDataUseCase } from "../../useCases/user/SaveNewUserDataUseCase";
import { VerifyUserUseCase } from "../../useCases/user/VerifyUserUseCase";


const mongoRepo = new MongoUserRepository();



// -----------------------------| NEW USER LOGIN AND SAVE DATA INJECTION ----------------------------------------------------------------------------------------
const saveUserUse = new SaveNewUserDataUseCase(mongoRepo);
const checkUserDataUse = new CheckExisitingUserUseCase(mongoRepo);
export const InjectedCreateNewUserDataController = new CreateUserController(saveUserUse, checkUserDataUse);


// -----------------------------| NEW USER LOGIN AND SAVE DATA INJECTION ----------------------------------------------------------------------------------------
const checkAndSaveUnknownUserUse = new CheckAndSaveUnknownUserUseCase(mongoRepo);
export const InjectedChekAndSaveUnknwnUserController = new CheckAndSaveUnknownUserController(checkAndSaveUnknownUserUse);



// -----------------------------| GET UNVERIFIED USER DATA BY ID INJECTION ----------------------------------------------------------------------------------------
const getUserDataByIdUse = new GetUserDataByIdUseCase(mongoRepo);
export const InjectedGetUnverifiedUserDataController = new GetUserDataByIdController(getUserDataByIdUse);


// -----------------------------| VERIFY AND UPDATE USER DATA INJECTION ----------------------------------------------------------------------------------------
const VerifyUserDataUse = new VerifyUserUseCase(mongoRepo);
export const InjectedVerifyAndUpdateUserDataController = new VerifyAndUpdateUserController(VerifyUserDataUse);


// -----------------------------| GET USER DATA BY PHONE INJECTION ----------------------------------------------------------------------------------------
const getUserDataByPhoneUse = new GetUserDataByPhoneUseCase(mongoRepo)
export const InjectedGetUserDataByPhoneController = new GetUserDataByPhoneController(getUserDataByPhoneUse)


// -----------------------------| GET ADMINS PROPERTY DATA BY PROPID AND ADMINID  INJECTION ----------------------------------------------------------------------------------------
const getAdminsPropertyDataUse = new GetAdminsPropertDataUseCase(mongoRepo)
export const InjectedGetAdminsPropertdataController = new GetAdminsPropertyDataController(getAdminsPropertyDataUse);


// -----------------------------| CHECK AND SEND CONVERSATION AND USER OR CREATE NEW CONVERSATION AND UPDATE USER WITH CONVERSATION ID INJECTION ----------------------------------------------------------------------------------------
const createConversationUse = new CreateConversationUseCase(mongoRepo)
export const InjectedCreateConversationController = new CreateConversationController(createConversationUse, getUserDataByIdUse);


