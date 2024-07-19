import { Posters } from "../../models/superAdmin/Posters";

export interface ISuperAdminAddNewPosterUseCase{
  AddNewPoster(imageUrl: string, id: string): Promise<Posters>;
}