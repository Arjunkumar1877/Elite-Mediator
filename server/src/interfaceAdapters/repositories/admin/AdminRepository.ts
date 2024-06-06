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
    const adminExist = await AdminModel.findOne({ email });
    return adminExist;
  }

  async GoogleOAuth(admin: Admin): Promise<Admin | null> {
    const newUser = await AdminModel.create(admin);
    newUser.verified = true;
    newUser.save();

    return newUser;
  }

  async UpdateAdmin(admin: Admin, id: string): Promise<Admin | null> {
    return await AdminModel.findOneAndUpdate({_id: id}, {
      $set: {
        address: admin.address,
        state: admin.state,
        city: admin.city,
        pincode: admin.pinccode,
        image: admin.image
      }
    }, {new: true})   
  }
}
