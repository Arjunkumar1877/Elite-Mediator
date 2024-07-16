import { Call } from "../../models/common/Call";

export interface IUserCallingFunctionalitiesUseCase{
    UserStartCall(callData: Call): Promise<Call>;
    UserAcceptCall(id: string): Promise<Call | any>;
    UserDeclineCall(id: string): Promise<Call | any>;
    UserDisconnectCall(id: string): Promise<Call | any>;
}