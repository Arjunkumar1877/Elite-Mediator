import { IGenerateQrCode } from '../../../entities/services/IGereateQrCode';
import QRCode from 'qrcode';

export class GenerateQrCode implements IGenerateQrCode {
    async GenerateQrCode(url: string): Promise<string> {
        try {
            const code = await QRCode.toDataURL(url);
            return code;
        } catch (error) {
            throw new Error(`Error generating QR code: ${error}`);
        }
    }


}
