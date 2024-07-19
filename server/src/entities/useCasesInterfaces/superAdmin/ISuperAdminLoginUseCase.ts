import { SuperAdmin } from "../../models/superAdmin/SuperAdmin";

export interface ISuperAdminLoginUseCase{
 SuperAdminLogin(email: string, password: string): Promise<SuperAdmin | string>; 
}