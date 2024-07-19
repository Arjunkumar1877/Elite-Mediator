import { AddUserFcmTokenController } from "../../interfaceAdapters/controllers/user/AddUserFcmTokenController";
import { CheckAndSaveUnknownUserController } from "../../interfaceAdapters/controllers/user/CheckAndSaveUnknownUserController";
import { CreateConversationController } from "../../interfaceAdapters/controllers/user/CreateConversationController";
import { CreateUserController } from "../../interfaceAdapters/controllers/user/CreateUserController";
import { GetAdminsPropertyDataController } from "../../interfaceAdapters/controllers/user/GetAdminsPropertyDataController";
import { GetUserDataByIdController } from "../../interfaceAdapters/controllers/user/GetUserDataByIdController";
import { GetUserDataByPhoneController } from "../../interfaceAdapters/controllers/user/GetUserDataByPhoneController";
import { GetUserMessagesController } from "../../interfaceAdapters/controllers/user/GetUserMessagesController";
import { SendUserMessageController } from "../../interfaceAdapters/controllers/user/SendUserMessageController";
import { UserCallingFunctionalitiesController } from "../../interfaceAdapters/controllers/user/UserCallingFunctionalitiesController";
import { VerifyAndUpdateUserController } from "../../interfaceAdapters/controllers/user/userVerifyAndUpdateController";
import { MongoUserRepository } from "../../interfaceAdapters/repositories/user/UserRepository";
import { AddUserFcmTokenUseCase } from "../../useCases/user/AddUserFcmTokenUseCase";
import { CheckAndSaveUnknownUserUseCase } from "../../useCases/user/CheckAndSaveUnknownUserUseCase";
import { CheckExisitingUserUseCase } from "../../useCases/user/CheckExisitingUserUseCase";
import { CreateConversationUseCase } from "../../useCases/user/CreateConversationUseCase";
import { GetAdminsPropertDataUseCase } from "../../useCases/user/GetAdminsPropertDataUseCase";
import { GetUserDataByIdUseCase } from "../../useCases/user/GetUserDataByIdUseCase";
import { GetUserDataByPhoneUseCase } from "../../useCases/user/GetUserDataByPhoneUseCase";
import { GetUserMessagesUseCase } from "../../useCases/user/GetUserMessagesUseCase";
import { SaveNewUserDataUseCase } from "../../useCases/user/SaveNewUserDataUseCase";
import { SendAndCreateUserMessageUseCase } from "../../useCases/user/SendAndCreateUserMessage";
import { UserCallingFunctionalitiesUseCase } from "../../useCases/user/UserCallingFunctionalitiesUseCase";
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


// -----------------------------| ADD FCM TOKEN TO USER DB FOR PUSH NOTIFICATION  ----------------------------------------------------------------------------------------
const AddUserNewFcmTokenOrGetExsistingOneUse = new AddUserFcmTokenUseCase(mongoRepo)
export const InjectedAddUserFcmCodeController = new AddUserFcmTokenController(AddUserNewFcmTokenOrGetExsistingOneUse);


// -----------------------------| GET USER DATA BY PHONE INJECTION ----------------------------------------------------------------------------------------
const getUserDataByPhoneUse = new GetUserDataByPhoneUseCase(mongoRepo)
export const InjectedGetUserDataByPhoneController = new GetUserDataByPhoneController(getUserDataByPhoneUse)


// -----------------------------| GET ADMINS PROPERTY DATA BY PROPID AND ADMINID  INJECTION ----------------------------------------------------------------------------------------
const getAdminsPropertyDataUse = new GetAdminsPropertDataUseCase(mongoRepo)
export const InjectedGetAdminsPropertdataController = new GetAdminsPropertyDataController(getAdminsPropertyDataUse);


// -----------------------------| CHECK AND SEND CONVERSATION AND USER OR CREATE NEW CONVERSATION AND UPDATE USER WITH CONVERSATION ID INJECTION ----------------------------------------------------------------------------------------
const createConversationUse = new CreateConversationUseCase(mongoRepo)
export const InjectedCreateConversationController = new CreateConversationController(createConversationUse, getUserDataByIdUse);


// -----------------------------| SEND MESSAGES FROM USER CHAT  ----------------------------------------------------------------------------------------
const SendUserMessageUse = new SendAndCreateUserMessageUseCase(mongoRepo)
export const InjectedSendAndCreateUserMessageController = new SendUserMessageController(SendUserMessageUse);


// -----------------------------| GET ALL MESSAGES FOR THE USER CHAT  ----------------------------------------------------------------------------------------
const getUserMessagesUse = new GetUserMessagesUseCase(mongoRepo)
export const InjectedGetUserMessagesController = new GetUserMessagesController(getUserMessagesUse);


// -----------------------------| CALLING FUNCTIONALITIES FROM THE USER TO THE ADMIN  ----------------------------------------------------------------------------------------
const usercallfunctionalitiesUse = new UserCallingFunctionalitiesUseCase(mongoRepo)
export const InjectedUserCallingFunctionalitiesController = new UserCallingFunctionalitiesController(usercallfunctionalitiesUse)

