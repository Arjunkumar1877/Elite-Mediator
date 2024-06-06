import { Admin } from "../../../entities/admin/Admin";
import { AdminModel } from "../../../frameworks/database/models/AdminModel";
import { IAdminRepository } from "./IAdminRepository";

export class MongoAdminRepository implements IAdminRepository {
  async CreateAdmin(admin: Admin): Promise<any> {
    console.log("repository file mongo db functions 🤷‍♂️🤷‍♂️🤷‍♂️");
    return AdminModel.create(admin);
  }

  async GetUnverifiedAdmin(phone: number): Promise<any> {
    return AdminModel.findOne({ phone });
  }

  async FindAdminByPhone(phone: number): Promise<Admin | null> {
    return await AdminModel.findOne({phone});
  }

  async UpdateUnverifiedAdmin(
    firebaseCode: string,
    phone: number
  ): Promise<any> {
    const update = await AdminModel.findOneAndUpdate(
      { phone: phone },
      { $set: { firebaseConfirm: firebaseCode } },
      { new: true }
    );

    return update;
  }

  async FindAdminByEmail(email: string): Promise<any> {
    const adminExist = await AdminModel.findOne({ email });
    return adminExist;
  }

  async GoogleOAuth(admin: Admin): Promise<any> {
    const newUser = await AdminModel.create(admin);
    newUser.verified = true;
    newUser.save();

    return newUser;
  }

  async UpdateAdmin(admin: Admin, id: string): Promise<Admin | null> {
    return await AdminModel.findOneAndUpdate({_id: id}, {
      $set: {
        username: admin.username,
        email: admin.email,
        phone: admin.phone,
        address: admin.password,
        state: admin.state,
        city: admin.city,
        // pincode: admin.pincode,
        image: admin.image
      }
    }, {new: true})   
  }
}
