import { User } from "../../models/user/User";

export interface IGetAnAdminsVisitorsForSuperAdminUseCase{
    GetVisitorsOfanAdmin(adminId: string, userType: string): Promise<User[] | null>;
}