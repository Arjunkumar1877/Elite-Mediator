import { ISaveNewUserDataUseCase } from "../../../entities/useCasesInterfaces/user/ISaveNewUserDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";


export class CreateUserController{
    constructor(private isavenewuserdatausecase: ISaveNewUserDataUseCase){};

    async UserCreateControl(req: Req, res: Res){
        try {
            console.log("Saveuserdata controller 💕💕💕💕")
            console.log(req.body)
            const data = await this.isavenewuserdatausecase.SaveNewUser(req.body);
            res.json(data);
        } catch (error) {
            console.log(error)
        }
    }
}