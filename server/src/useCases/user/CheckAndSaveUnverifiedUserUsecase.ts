import { User } from "../../entities/models/user/User";
import { ICheckAndSaveUnverifiedUserUseCase } from "../../entities/useCasesInterfaces/user/ICheckAndSaveUnverifiedUserUseCase";
import { IUserRepository } from "../../interfaceAdapters/repositories/user/IUserRepository";


export class  CheckAndSaveUnverifiedUserUsecase implements ICheckAndSaveUnverifiedUserUseCase{
  constructor(private iuserrepository: IUserRepository){};

  async CheckAndCreateUnverifiedUser(user: User): Promise<User> {
      const createdData: any = await this.iuserrepository.CreateNewUser(user);
      const userData: any = await this.iuserrepository.FindUserByIdPopulateAdminData(createdData._id);

      return userData;
  }
}