import { Admin } from "../../../entities/models/admin/Admin";
import { Posters } from "../../../entities/models/superAdmin/Posters";
import { SuperAdmin } from "../../../entities/models/superAdmin/SuperAdmin";
import { AdminModel } from "../../../frameworks/database/models/admin/AdminModel";
import { QrModel } from "../../../frameworks/database/models/admin/QrDataModel";
import { PosterModel } from "../../../frameworks/database/models/superAdmin/PostersModel";
import { SuperAdminModel } from "../../../frameworks/database/models/superAdmin/SuperAdminModel";
import { UserModel } from "../../../frameworks/database/models/user/User";
import { ISuperAdminRepository } from "./ISuperAdminRepository";

export class MongoSuperAdminRepository implements ISuperAdminRepository {
  async FindByEmail(email: string): Promise<SuperAdmin | null> {
    return await SuperAdminModel.findOne({ email });
  }

  async FindAllAdmins(): Promise<any> {
    return await AdminModel.find().sort({ createdAt: -1 });
  }

  async FindAnAdminByIdForSuperAdmin(adminId: string): Promise<Admin | null>{
    return await AdminModel.findOne({_id: adminId});
  }

  async FindFilteredUserForSuperAdmin(adminId: string, userType: string): Promise<any> {
    const filterUser: any = { adminId };
  // console.log("super admin repository 💕💕💕💕💕💕💕💕💕💕💕💕💕🖼️🖼️")
  // console.log(userType, " ", adminId)
    if (userType === 'All') {
    const users: any = await UserModel.find({adminId: adminId});
    // console.log(users)

    return users
    }else{
      const properties = await QrModel.find({ userType });
      const propertyIds = properties.map(property => property._id);
      filterUser.propId = { $in: propertyIds };
    }
  
    const filteredUsers: any = await UserModel.find(filterUser);
    return filteredUsers;
    
  }


  async FindAPosterByIdAndUpdate(imageUrl: string, posterId: string): Promise<any>{
    const saved = await PosterModel.findOneAndUpdate({_id: posterId}, {
      $set: {
          imageUrl: imageUrl
      }
  }, { new: true})
  if(saved){
    return "saved";
  }else{
    return "failed"
  }
  }

  async FindAllPosters(): Promise<Posters[] | null> {
    const posters: any = await PosterModel.find({});

    return posters;
  }

  async FindByIdAndBlockAnAdmin(adminId: string): Promise<boolean> {
    const blocked: any = await AdminModel.findOneAndUpdate({_id: adminId},{
      $set: {
          blocked: true
      }
  });

  if(blocked){
    return true;
  }else{
    return false;
  }

  }

  async FindByIdAndUnblockAnAdmin(adminId: string): Promise<boolean> {
    const Unblocked: any = await AdminModel.findOneAndUpdate({_id: adminId},{
      $set: {
          blocked: false
      }
  });

  if(Unblocked){
    return true;
  }else{
    return false;
  }

  }

}
