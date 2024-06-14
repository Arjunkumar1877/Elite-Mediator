import { CreateUserController } from "../../interfaceAdapters/controllers/user/CreateUserController";
import { GetUserDataController } from "../../interfaceAdapters/controllers/user/GetUserDataController";
import { MongoUserRepository } from "../../interfaceAdapters/repositories/user/UserRepository";
import { GetUnverifiedAdminDataUsecase } from "../../useCases/admin/GetUnverifiedAdminUseCase";
import { GetUnverifiedUserDataUseCase } from "../../useCases/user/GetUnverifiedUserDataUseCase";
import { SaveNewUserDataUseCase } from "../../useCases/user/SaveNewUserDataUseCase";


const mongoRepo = new MongoUserRepository();




const saveUserUse = new SaveNewUserDataUseCase(mongoRepo);
export const InjectedCreateNewUserData = new CreateUserController(saveUserUse);



const getunverifiedUserUse = new GetUnverifiedUserDataUseCase(mongoRepo);
export const InjectedGetUnverifiedUserData = new GetUserDataController(getunverifiedUserUse);