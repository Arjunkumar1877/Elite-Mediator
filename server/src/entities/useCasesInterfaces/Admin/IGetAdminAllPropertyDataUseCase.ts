import { PropertyData } from "../../models/admin/PropertyData";

export interface IGetAdminAllPropertyDataUseCase{
    GetAdminsPropertyDatas(id: string): Promise<any>;
}