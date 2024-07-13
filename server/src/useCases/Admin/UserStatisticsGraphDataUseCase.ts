import { GraphDataType, IUserStatisticsGraphDataUseCase } from "../../entities/useCasesInterfaces/Admin/IUserStatisticsGraphDataUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class UserStatisticsGraphDataUseCase implements IUserStatisticsGraphDataUseCase{
  constructor(private iadminrepository: IAdminRepository){};

  async GetUserStatisticGraphData(adminId: string): Promise<GraphDataType> {
      return this.iadminrepository.FindUserStaticsDataOfAdminById(adminId);
  }
  
}