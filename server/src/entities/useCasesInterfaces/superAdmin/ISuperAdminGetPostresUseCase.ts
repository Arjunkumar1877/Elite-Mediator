import { Posters } from "../../models/superAdmin/Posters";

export interface  ISuperAdminGetPostersUseCase{
   GetAllPosters(): Promise<Posters[] | any>;
}