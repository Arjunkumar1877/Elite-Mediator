import { Call } from "../../models/common/Call";

export interface ICallingFunctionsUseCase{
   StartCall(callData: Call): Promise<Call>;
   AcceptCall(id: string): Promise<Call | any>;
   DeclineCall(id: string): Promise<Call | any>;
   DisconnectCall(id: string): Promise<Call | any>;
}