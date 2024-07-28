import { User } from "../../entities/models/user/User";
import { IAddUserFcmTokenUseCase } from "../../entities/useCasesInterfaces/user/IAddUserFcmTokenUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";

export class AddUserFcmTokenUseCase implements IAddUserFcmTokenUseCase {
  constructor(private iuserrepository: IUserRepository) {}

  async AddUserFcmToken(userId: string, token: string): Promise<User> {
    const exsistingData: any = await this.iuserrepository.FindUserFcmToken(
      token,
      userId
    );

    if (exsistingData) {
      return exsistingData;
    } else {
      const addedToken: any = await this.iuserrepository.FindUserAndAddFcmToken(
        token,
        userId
      );
      console.log(addedToken)
        const userData: any = await this.iuserrepository.FindUserByIdPopulateAdminData(userId);
        return userData
    }
  }
}
