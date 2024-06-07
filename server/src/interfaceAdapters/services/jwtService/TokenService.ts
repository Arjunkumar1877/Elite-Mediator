import { NextFunction } from "express";
import { TokenServices } from "./ITokenServices";
import { Req, Res } from "../../../frameworks/types/ServerTypes";
import jwt from 'jsonwebtoken';


export class JwtTokenAdapter implements TokenServices{
    async CreateJwtToken(req: Req, res: Res, next: NextFunction): Promise<void | NextFunction> {
        
    }
    async verifyToken(req: Req, res: Res, next: NextFunction): Promise<void | NextFunction> {     
      const token = req.cookies.access_token;

      if(!token){
        return 
      }
      
    }
}