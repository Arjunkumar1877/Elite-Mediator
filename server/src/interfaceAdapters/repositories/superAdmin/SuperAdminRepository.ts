import { Admin } from "../../../entities/models/admin/Admin";
import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";
import { AdminModel } from "../../../frameworks/database/models/AdminModel";
import { SuperAdminModel } from "../../../frameworks/database/models/SuperAdminModel";
import { ISuperAdminRepository } from "./ISuperAdminRepository";

export class MongoSuperAdminRepository implements ISuperAdminRepository{
    async FindByEmail(email: string): Promise<SuperAdmin | null> {
        return await SuperAdminModel.findOne({email});
    }
    
    async FindAll(): Promise<Admin[]> {
     return await AdminModel.find();
    }
}