import { Admin } from "../../../entities/admin/Admin";
import { AdminModel } from "../../../frameworks/database/models/AdminModel";
import { IAdminRepository } from "./IAdminRepository";



export class  MongoAdminRepository implements IAdminRepository{
    async CreateAdmin(admin: Admin): Promise<Admin> {
        return AdminModel.create(admin);
    }
}