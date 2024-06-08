import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";

export interface ISuperAdminRepository {
    FindByEmail(email: string): Promise<SuperAdmin | null>;
}