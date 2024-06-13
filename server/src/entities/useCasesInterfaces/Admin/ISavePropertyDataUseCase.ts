import { PropertyData } from "../../models/admin/PropertyData";

export interface ISavePropertDataUseCase{
    SavePropertData(propertyDat: PropertyData): Promise<PropertyData>;
}