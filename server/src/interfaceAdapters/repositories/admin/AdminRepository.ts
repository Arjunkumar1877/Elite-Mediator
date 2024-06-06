import { Admin } from "../../../entities/admin/Admin";
import { AdminModel } from "../../../frameworks/database/models/AdminModel";
import { IAdminRepository } from "./IAdminRepository";

export class MongoAdminRepository implements IAdminRepository {


  async CreateAdmin(admin: Admin): Promise<Admin> {
    console.log("repository file mongo db functions 🤷‍♂️🤷‍♂️🤷‍♂️");
    return AdminModel.create(admin);
  }

  async GetUnverifiedAdmin(phone: number): Promise<Admin | null> {
    return AdminModel.findOne({ phone });
  }

  async UpdateUnverifiedAdmin(
    firebaseCode: string,
    phone: number
  ): Promise<Admin | null> {
    const update = await AdminModel.findOneAndUpdate(
      { phone: phone },
      { $set: { firebaseConfirm: firebaseCode } },
      { new: true }
    );

    return update;
  }

   async LoginAdmin(email: string): Promise<Admin | null> {
     const adminExist = await AdminModel.findOne({email});
     return adminExist;
  }

}
