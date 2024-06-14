import { CreateUserController } from "../../interfaceAdapters/controllers/user/CreateUserController";
import { MongoUserRepository } from "../../interfaceAdapters/repositories/user/UserRepository";
import { SaveNewUserDataUseCase } from "../../useCases/user/SaveNewUserDataUseCase";


const mongoRepo = new MongoUserRepository();

const saveUserUseCase = new SaveNewUserDataUseCase(mongoRepo);
export const InjectedCreateNewUserData = new CreateUserController(saveUserUseCase);