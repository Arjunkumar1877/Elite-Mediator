import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";
import { SuperAdminModel } from "../../../frameworks/database/models/SuperAdminModel";
import { ISuperAdminRepository } from "./ISuperAdminRepository";

export class MongoSuperAdminRepository implements ISuperAdminRepository{
    async FindByEmail(email: string): Promise<SuperAdmin | null> {
        return await SuperAdminModel.findOne({email});
    }
}