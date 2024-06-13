
export interface IQrGenerateUseCase{
    GenerateQrCodeData(qrCode: string): Promise<string>;
}