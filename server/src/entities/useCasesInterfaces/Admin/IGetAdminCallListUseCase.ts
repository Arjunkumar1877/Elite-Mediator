import { Call } from "../../models/common/Call";

export interface IGetAdminCallListUseCase{
   GetAdminsCallList(id: string, page: any): Promise <Call[] | any>;
}
