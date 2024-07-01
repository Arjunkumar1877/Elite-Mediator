import { Call } from "../../entities/models/common/Call";
import { ICallingFunctionsUseCase } from "../../entities/useCasesInterfaces/common/ICallingFunctionsUseCase";
import { ICommonRepository } from "../../interfaceAdapters/repositories/common/ICommonRepository";

export class CallingFunctionsUseCase implements ICallingFunctionsUseCase{
    constructor(private icommonrepository: ICommonRepository){};
    async StartCall(callData: Call): Promise<Call> {
        return this.icommonrepository.CreateACallToDb(callData);
    }

    async AcceptCall(id: string): Promise<any> {
        return this.icommonrepository.AcceptCallAndUpdatOnDb(id);     
    }

    async DeclineCall(id: string): Promise<any> {
         return this.icommonrepository.DeclineCallAndUpdateOnDb(id);     
    }

    async DisconnectCall(id: string): Promise<any> {
         return this.icommonrepository.DisconnectCallAndUpdateOnDb(id);     
    }
}