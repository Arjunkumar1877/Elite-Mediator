
export interface IAdminResetPasswordUseCase{
  ResetPassword(id: string, password: string): Promise<string | boolean>;
}