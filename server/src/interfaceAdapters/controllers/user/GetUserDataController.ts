import { IGetUnverifiedUserDataUseCase } from "../../../entities/useCasesInterfaces/user/IGetUnverifiedUserDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetUserDataController{
    constructor(private igetuserDatausecase: IGetUnverifiedUserDataUseCase){};

    async GetUnverifiedUserDataControl(req: Req, res: Res): Promise<void>{
      try {
        const data = await this.igetuserDatausecase.GetUnverifiedUserData(req.params.id);

        res.json(data);
      } catch (error) {
        console.log(error)
      }

    }
}