import { SuperAdmin } from "../../models/superAdmin/SuperAdmin";

export interface ISuperAdminLogin{
 SuperAdminLogin(email: string, password: string): Promise<SuperAdmin | string>; 
}