import { Call } from "../../entities/models/common/Call";
import { IUserCallingFunctionalitiesUseCase } from "../../entities/useCasesInterfaces/user/IUserCallingFunctionalitiesUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class  UserCallingFunctionalitiesUseCase implements IUserCallingFunctionalitiesUseCase{
    constructor(private iuserrepository: IUserRepository){};

    async UserStartCall(callData: Call): Promise<Call> {
        return this.iuserrepository.CreateUserCallToDb(callData);
    }

    async UserAcceptCall(id: string): Promise<any> {
        return this.iuserrepository.AcceptUserCallAndUpdatOnDb(id);     
    }

    async  UserDeclineCall(id: string): Promise<any> {
         return this.iuserrepository.DeclineUserCallAndUpdateOnDb(id);     
    }

    async UserDisconnectCall(id: string): Promise<any> {
         return this.iuserrepository.DisconnectUserCallAndUpdateOnDb(id);     
    }
}