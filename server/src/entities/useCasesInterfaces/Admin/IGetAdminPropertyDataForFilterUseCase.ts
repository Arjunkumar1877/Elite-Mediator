import { PropertyData } from "../../models/admin/PropertyData";

export interface IGetAdminPropertyDataForFilterUseCase{
  GetAdminPropertDataForFiltering(adminId: string): Promise<PropertyData[] | null>
}