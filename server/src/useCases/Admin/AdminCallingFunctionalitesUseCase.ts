import { Call } from "../../entities/models/common/Call";
import { IAdminCallingFunctionsUseCase } from "../../entities/useCasesInterfaces/admin/IAdminCallingFunctionalitesUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class  AdminCallingFunctionalitesUseCase implements IAdminCallingFunctionsUseCase{
    constructor(private iadminRepository: IAdminRepository){};

    async AdminStartCall(callData: Call): Promise<Call> {
        return this.iadminRepository.CreateAdminCallToDb(callData);
    }

    async AdminAcceptCall(id: string): Promise<any> {
        return this.iadminRepository.AcceptAdminCallAndUpdatOnDb(id);     
    }

    async AdminDeclineCall(id: string): Promise<any> {
         return this.iadminRepository.DeclineAdminCallAndUpdateOnDb(id);     
    }

    async AdminDisconnectCall(id: string): Promise<any> {
         return this.iadminRepository.DisconnectAdminCallAndUpdateOnDb(id);     
    }
    
}