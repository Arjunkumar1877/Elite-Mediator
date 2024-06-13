import { PropertyData } from "../../models/admin/PropertyData";

export interface IGetAdminPropertyDataUseCase{
    GetAdminsPropertyDatas(id: string): Promise<any>;
}