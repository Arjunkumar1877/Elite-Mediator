export interface ISuperAdminUnblockAdminUseCase{
 UnblockAnAdmin(adminId: string): Promise<boolean>;
}