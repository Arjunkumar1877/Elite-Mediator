import { Res, Req, Next } from "../types/ServerTypes";

export interface TokenServices{
    verifyToken(req: Req, res: Res, next:Next): Promise<Next | void>;
    CreateJwtToken(req: Req, res: Res, next:Next): Promise<Next | void>;
}