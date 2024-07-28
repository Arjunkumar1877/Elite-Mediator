import {  IGetAdminUseCase } from "../../../entities/useCasesInterfaces/admin/IGetAdminUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class GetAdminDataController {
  constructor(private igetadmindatausecase: IGetAdminUseCase){}

    async GetAdminDataByIdController(req: Req, res: Res): Promise<void> {
        try {

          console.log(req.body)
         
          const data = await this.igetadmindatausecase.FindAdminById(req.params.id);
          res.json(data);
        } catch (error) {
          console.log(error)
        }
      }
}