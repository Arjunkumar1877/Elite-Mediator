import { IGetUsersListUseCase } from "../../../entities/useCasesInterfaces/Admin/IGetUsersListUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetUsersListController {
    constructor(private igetuserslistusecase: IGetUsersListUseCase){};

    async GetTheUserListControl(req: Req, res: Res): Promise<void>{
        try {
            const data = await this.igetuserslistusecase.GetTheUserList(req.params.adminId);

            res.json(data);
        } catch (error) {
            console.log(error)
        }
    }
}