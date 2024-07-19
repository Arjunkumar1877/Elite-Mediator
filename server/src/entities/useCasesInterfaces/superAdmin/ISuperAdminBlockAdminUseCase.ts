
export interface ISuperAdminBlockAdminUseCase{
blockAnAdmin(adminId: string): Promise<boolean>;
}