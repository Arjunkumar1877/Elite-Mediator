import { PropertyData } from "../../entities/models/admin/PropertyData";
import { ISavePropertDataUseCase } from "../../entities/useCasesInterfaces/admin/ISavePropertyDataUseCase";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";


export class SavePropertyDataUseCase implements ISavePropertDataUseCase{

constructor(private iadminRepository: IAdminRepository){};

    async SavePropertData(propertyData: PropertyData): Promise<any> {
        return this.iadminRepository.CreatePropertyData(propertyData);
    }
}