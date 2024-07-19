import { IDeleteAdminPropertyUseCase } from "../../../entities/useCasesInterfaces/Admin/IDeleteAdminPropertyUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class DeleteAdminPropertyController{
 constructor(private ideleteadminpropertyusecase: IDeleteAdminPropertyUseCase){};

 async DeleteAdminPropertyControl(req: Req, res: Res): Promise<void> {
    try {
        const id:string = req.params.propertyId
        const isDeleted: any = this.ideleteadminpropertyusecase.DeleteAdminsProperty(id);

        res.json({success: isDeleted});
    } catch (error) {
        console.log(error)
    }
 }
}