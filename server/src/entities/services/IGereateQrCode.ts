export interface IGenerateQrCode {
    GenerateQrCode(url: string): Promise<string>;
}

