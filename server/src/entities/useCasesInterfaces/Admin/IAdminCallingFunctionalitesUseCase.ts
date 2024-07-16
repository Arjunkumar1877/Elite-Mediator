import { Call } from "../../models/common/Call";


export interface IAdminCallingFunctionsUseCase{
   AdminStartCall(callData: Call): Promise<Call>;
   AdminAcceptCall(id: string): Promise<Call | any>;
   AdminDeclineCall(id: string): Promise<Call | any>;
   AdminDisconnectCall(id: string): Promise<Call | any>;
}