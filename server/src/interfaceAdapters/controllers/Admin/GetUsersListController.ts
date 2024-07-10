import { IGetUsersListUseCase } from "../../../entities/useCasesInterfaces/Admin/IGetUsersListUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetUsersListController {
    constructor(private igetuserslistusecase: IGetUsersListUseCase) {}

    async GetTheUserListControl(req: Req, res: Res): Promise<void> {
        try {
            const { adminId, startDate, endDate, propertyName, userType } = req.query;

            if (!adminId) {
                res.status(400).json({ message: "Admin ID is required" });
                return;
            }

            const data = await this.igetuserslistusecase.GetTheUserList(
                adminId as string,
                startDate as string,
                endDate as string,
                propertyName as string,
                userType as string
            );

            if (!data.length) {
                res.status(404).json({ message: "No users found" });
                return;
            }

            res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching users list:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}
