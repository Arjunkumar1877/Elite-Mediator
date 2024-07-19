import { ISuperAdminGetPostersUseCase } from "../../../entities/useCasesInterfaces/superAdmin/ISuperAdminGetPostresUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class SuperAdminGetAllPostersControllers {
constructor(private isuperadmingetallpostersusecase: ISuperAdminGetPostersUseCase){};

async SuperAdminGetAllPOstersControl(req: Req, res: Res): Promise<void>{
  try {
    const data:any = await this.isuperadmingetallpostersusecase.GetAllPosters();

    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
}