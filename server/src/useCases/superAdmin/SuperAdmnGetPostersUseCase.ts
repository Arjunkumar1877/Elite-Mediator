import { Posters } from "../../entities/models/superAdmin/Posters";
import { ISuperAdminGetPostersUseCase } from "../../entities/useCasesInterfaces/superAdmin/ISuperAdminGetPostresUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";


export class SuperAdmnGetPostersUseCase implements ISuperAdminGetPostersUseCase{
    constructor(private isuperadminrepository: ISuperAdminRepository){};

    async GetAllPosters(): Promise<Posters[] | any> {
     return await this.isuperadminrepository.FindAllPosters();     
    }
}