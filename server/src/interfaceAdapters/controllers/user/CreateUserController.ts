import { ICheckExisitingUserUseCase } from "../../../entities/useCasesInterfaces/user/ICheckExisitingUserUseCase";
import { ISaveNewUserDataUseCase } from "../../../entities/useCasesInterfaces/user/ISaveNewUserDataUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class CreateUserController {
  constructor(
    private isavenewuserdatausecase: ISaveNewUserDataUseCase,
    private icheckexisitinguserusecase: ICheckExisitingUserUseCase,
  ) {}

  async UserCreateControl(req: Req, res: Res) {
    try {
      console.log(req.body.phone, req.body.propId, req.body.adminId);

      const userData = await this.icheckexisitinguserusecase.CheckExisitingUser(
        req.body.phone,
        req.body.propId,
        req.body.adminId
      );

      if (userData === "user does not exist" ||  userData === "user not verified") {
        console.log("Saveuserdata controller 💕💕💕💕");
        console.log(req.body);
        const data = await this.isavenewuserdatausecase.SaveNewUser(req.body);
        res.status(201).json({ data: data, message: "User created" });
      } else {
        res
          .status(200)
          .json({ data: userData, message: "User already exists" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async SaveUnverifiedUsderControl(req: Req, res: Res): Promise<void>{
    try {
      const data = await this.isavenewuserdatausecase.SaveNewUser(req.body);
      res.json(data);
    } catch (error) {
      console.log(error)
    }
  }


}
