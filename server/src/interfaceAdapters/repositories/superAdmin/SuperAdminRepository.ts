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

  async FindAllRegisteredAdminsAndVisitors(): Promise<{
    Admins: number;
    AllVisitors: number;
    VerifiedVisitors: number;
    UnknownVisitors: number;
    UnverifiedVisitors: number;
  }> {
    const Admins = await AdminModel.countDocuments();
  
    const UnknownVisitors = await QrModel.find({ userType: 'Unknown' });
    const UnverifiedVisitors = await QrModel.find({ userType: 'Unverified' });
    const VerifiedVisitors = await QrModel.find({ userType: 'Verified' });
  
    // Helper function to sum up scannedCount across an array of visitors
    const sumScannedCount = (visitors: any[]): number => {
      return visitors.reduce((sum, visitor) => sum + (visitor.scannedCount || 0), 0);
    };
  
    const AllVisitors = sumScannedCount(UnknownVisitors) + sumScannedCount(UnverifiedVisitors) + sumScannedCount(VerifiedVisitors);
  
    return {
      Admins,
      AllVisitors,
      VerifiedVisitors: sumScannedCount(VerifiedVisitors),
      UnknownVisitors: sumScannedCount(UnknownVisitors),
      UnverifiedVisitors: sumScannedCount(UnverifiedVisitors),
    };
  }
  
  async FindAllGeneratedQrCodesCounts(): Promise<{
    All: number;
    unknown: number;
    unverified: number;
    verified: number;
  }> {
   
    const AllCodes = await QrModel.countDocuments();
    const VerifiedCodes = await QrModel.countDocuments({ userType: 'Verified' });
    const UnVerifiedcodes = await QrModel.countDocuments({ userType: 'Unverified' });
    const UnknownCodes = await QrModel.countDocuments({ userType: 'Unknown' });
  
    return {
      All: AllCodes,
      unknown: UnknownCodes,
      unverified: UnVerifiedcodes,
      verified: VerifiedCodes,
    };
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
