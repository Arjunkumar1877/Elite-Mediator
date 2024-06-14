import { IGenerateQrCode } from "../../../entities/services/IGereateQrCode";
import { Req, Res } from "../../../frameworks/types/ServerTypes";

export class GenerateQrController {
    constructor(private igenerateqrcode: IGenerateQrCode) {};

    async GenerateQrCode(req: Req, res: Res): Promise<void> {
        try {
            const url: string = `${req.protocol}://${req.headers.host}/new_user?adminId=${req.params.adminId}&propId=${req.params.propertyId}`;
            const qrCodeUrl = await this.igenerateqrcode.GenerateQrCode(url);
            res.json({ qrCodeUrl });
        } catch (error) {
            res.status(500).json({ error: 'Error generating QR code' });
        }
    }
}


