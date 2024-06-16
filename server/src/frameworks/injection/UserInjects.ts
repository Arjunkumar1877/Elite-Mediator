import { CreateConversationController } from "../../interfaceAdapters/controllers/user/CreateConversationController";
import { CreateUserController } from "../../interfaceAdapters/controllers/user/CreateUserController";
import { GetUnverifiedUserDataController } from "../../interfaceAdapters/controllers/user/GetUnverifiedUserDataController";
import { GetUserDataByPhoneController } from "../../interfaceAdapters/controllers/user/GetUserDataByPhoneController";
import { VerifyAndUpdateUserController } from "../../interfaceAdapters/controllers/user/UserVerifyAndUpdateController";
import { MongoUserRepository } from "../../interfaceAdapters/repositories/user/UserRepository";
import { GetUnverifiedAdminDataUsecase } from "../../useCases/admin/GetUnverifiedAdminUseCase";
import { CheckExisitingUserUseCase } from "../../useCases/user/CheckExisitingUserUseCase";
import { CreateConversationUseCase } from "../../useCases/user/CreateConversationUseCase";
import { GetUserDataUseCase } from "../../useCases/user/GetUnverifiedUserDataUseCase";
import { GetUserDataByPhoneUseCase } from "../../useCases/user/GetUserDataByPhoneUseCase";
import { SaveNewUserDataUseCase } from "../../useCases/user/SaveNewUserDataUseCase";
import { VerifyUserUseCase } from "../../useCases/user/VerifyUserUseCase";


const mongoRepo = new MongoUserRepository();



// -----------------------------| NEW USER LOGIN AND SAVE DATA INJECTION ----------------------------------------------------------------------------------------
const saveUserUse = new SaveNewUserDataUseCase(mongoRepo);
const checkUserDataUse = new CheckExisitingUserUseCase(mongoRepo);
export const InjectedCreateNewUserData = new CreateUserController(saveUserUse, checkUserDataUse);


// -----------------------------| GET UNVERIFIED USER DATA BY ID INJECTION ----------------------------------------------------------------------------------------
const getUserDataByIdUse = new GetUserDataUseCase(mongoRepo);
export const InjectedGetUnverifiedUserData = new GetUnverifiedUserDataController(getUserDataByIdUse);


// -----------------------------| VERIFY AND UPDATE USER DATA INJECTION ----------------------------------------------------------------------------------------
const VerifyUserDataUse = new VerifyUserUseCase(mongoRepo);
export const InjectedVerifyAndUpdateUserData = new VerifyAndUpdateUserController(VerifyUserDataUse);


// -----------------------------| GET USER DATA BY PHONE INJECTION ----------------------------------------------------------------------------------------
const getUserDataByPhoneUse = new GetUserDataByPhoneUseCase(mongoRepo)
export const InjectedGetUserDataByPHone = new GetUserDataByPhoneController(getUserDataByPhoneUse)


// -----------------------------| CHECK AND SEND CONVERSATION OR CREATE NEW CONVERSATION INJECTION ----------------------------------------------------------------------------------------
const createConversationUse = new CreateConversationUseCase(mongoRepo)
export const InjectedCreateConversation = new CreateConversationController(createConversationUse)


