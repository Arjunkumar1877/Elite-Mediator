import { Admin } from "../../../entities/models/admin/Admin";
import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";

export interface ISuperAdminRepository {
    FindByEmail(email: string): Promise<SuperAdmin | null>;
    FindAll(): Promise<Admin[]>;
}