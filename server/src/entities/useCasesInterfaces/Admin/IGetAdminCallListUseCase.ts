import { Call } from "../../models/common/Call";

export interface IGetAdminCallListUseCase{
   GetAdminsCallList(id: string): Promise <Call[] | null>;
}
