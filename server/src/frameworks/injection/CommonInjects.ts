import { CallFunctionalitiesController } from "../../interfaceAdapters/controllers/common/CallFunctionalitiesController";
import { GetMessagesController } from "../../interfaceAdapters/controllers/common/GetMessagesController";
import { SendMessageController } from "../../interfaceAdapters/controllers/common/SendMessageController";
import { MongoCommonRepository } from "../../interfaceAdapters/repositories/common/CommonReopsitory";
import { CallingFunctionsUseCase } from "../../useCases/common/CallingFunctionsUseCase";
import { GetMessagesUseCase } from "../../useCases/common/GetMessagesUseCase";
import { SendMessageUseCase } from "../../useCases/common/SendMessageUseCase";
// import { io } from "../services/socketIo/SocketIo";


const commonRepo = new MongoCommonRepository();


// -----------------------------| SEND MESSAGE BY ADMIN AND USER INJECTION ----------------------------------------------------------------------------------------
const sendMessageUse = new SendMessageUseCase(commonRepo);
export const InjectedSendMesssage = new SendMessageController(sendMessageUse);



// -----------------------------| GET MESSAGES AND CONVERSATION DATA FOR BOTH USER AND ADMIN INJECTION ----------------------------------------------------------------------------------------
const getMessageUse = new GetMessagesUseCase(commonRepo);
export const InjectedGetMessagesController = new GetMessagesController(getMessageUse);



// -----------------------------| CREATE, ACCEPT, DECLINE, DISCONNECT CALLS FOR BOTH USER AND ADMIN INJECTION ----------------------------------------------------------------------------------------
const callingFunctionsUse = new CallingFunctionsUseCase(commonRepo);
export const InjectedCallingFunctionalitiesController = new CallFunctionalitiesController(callingFunctionsUse);