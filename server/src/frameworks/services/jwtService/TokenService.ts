import { NextFunction } from "express";
import { TokenServices } from "./ITokenServices";
import { Req, Res } from "../../types/ServerTypes";
import jwt from "jsonwebtoken";
import { MongoAdminRepository } from "../../../interfaceAdapters/repositories/admin/AdminRepository";
import { Errors } from "../../../entities/utils/errors/Error.";

const errorFun = new Errors();

export class JwtTokenAdapter implements TokenServices {
  // constructor(private adminrepository: MongoAdminRepository) {}

  async CreateJwtToken(
    req: Req,
    res: Res,
    next: NextFunction
  ): Promise<void | NextFunction> {
    try {
      // const admin = await this.adminrepository.FindAdminByEmail(req.body.email);
      const token = await jwt.sign(
        { email: req.body.email },
        "hellooooo" as string,
        { expiresIn: "600m" }
      );
      req.body.token = token;
      next();
    } catch (error) {
      next(errorFun.errorHandler(500, "Token creation failed"));
    }
  }

  async verifyToken(
    req: Req,
    res: Res,
    next: NextFunction
  ): Promise<void | NextFunction> {
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorFun.errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, "hellooooo" as string, (err: any, user: any) => {
      if (err) {
        return next(errorFun.errorHandler(401, "Unauthorized"));
      }

req.body.user = user     

      next();
    });
  }
}
