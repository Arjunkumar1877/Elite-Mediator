"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateQrController = void 0;
class GenerateQrController {
    constructor(igenerateqrcode) {
        this.igenerateqrcode = igenerateqrcode;
    }
    ;
    GenerateQrCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${req.protocol}://${req.headers.host}/new_user?adminId=${req.params.adminId}&propId=${req.params.propertyId}`;
                const qrCodeUrl = yield this.igenerateqrcode.GenerateQrCode(url);
                res.json({ qrCodeUrl });
            }
            catch (error) {
                res.status(500).json({ error: 'Error generating QR code' });
            }
        });
    }
}
exports.GenerateQrController = GenerateQrController;
