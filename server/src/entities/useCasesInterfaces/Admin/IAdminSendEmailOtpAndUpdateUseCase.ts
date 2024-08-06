export interface IAdminSendEmailOtpAndUpdateUseCase{
  SendEmailOtpAndupdateToDb(id: string): Promise<any>;
}
