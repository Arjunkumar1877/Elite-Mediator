import { PropertyData } from "../../models/admin/PropertyData";

export interface IGetAdminsPropertDataUseCase{
    GetAdminsPropertDataUseCase(propId: string, adminId: string): Promise<PropertyData | null>;

} 