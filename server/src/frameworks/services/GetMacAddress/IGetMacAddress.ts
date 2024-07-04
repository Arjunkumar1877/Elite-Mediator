import { Req, Res } from "../../types/ServerTypes";

export interface IGetMacAddress {
    findMacAddress(req: Req, res: Res): any;
}
