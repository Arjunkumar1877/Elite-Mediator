import { IGetAdminsPropertDataUseCase } from "../../../entities/useCasesInterfaces/user/IGetAdminsPropertyData";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GetAdminsPropertyDataController{
    constructor(private igetadminspropertydatausecase: IGetAdminsPropertDataUseCase){};


    async GetAdminsPropertyDataControl(req: Req, res: Res): Promise<void>{
       try {
         const data = await this.igetadminspropertydatausecase.GetAdminsPropertDataUseCase(req.body.propId, req.body.adminId);

         res.json(data)
       } catch (error) {
        console.log(error)
       }
    }


}