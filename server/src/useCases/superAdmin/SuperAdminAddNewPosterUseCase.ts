import { Posters } from "../../entities/models/superAdmin/Posters";
import { ISuperAdminAddNewPosterUseCase } from "../../entities/useCasesInterfaces/superAdmin/ISuperAdminAddNewPosterUseCase";
import { ISuperAdminRepository } from "../../interfaceAdapters/repositories/superAdmin/ISuperAdminRepository";

export class SuperAdminAddNewPosterUseCase implements ISuperAdminAddNewPosterUseCase{
    constructor(private isuperadminrepository: ISuperAdminRepository){};

    async AddNewPoster(imageUrl: string, id: string): Promise<Posters> {
        const addedPoster:any = await this.isuperadminrepository.FindAPosterByIdAndUpdate(imageUrl, id);
        return addedPoster;
    }
}