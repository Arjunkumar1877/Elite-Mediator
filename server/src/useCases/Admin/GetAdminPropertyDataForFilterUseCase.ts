import { PropertyData } from "../../entities/models/admin/PropertyData";
import { IGetAdminPropertyDataForFilterUseCase } from "../../entities/useCasesInterfaces/Admin/IGetAdminPropertyDataForFilterUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";

export class GetAdminPropertyDataForFilterUseCase implements IGetAdminPropertyDataForFilterUseCase{
  constructor(private iadminrepository: IAdminRepository){};

  async GetAdminPropertDataForFiltering(adminId: string): Promise<PropertyData[] | null> {
    const data = await this.iadminrepository.FindAdminsPropertDatasForFilter(adminId);  
    return data;
  }
}