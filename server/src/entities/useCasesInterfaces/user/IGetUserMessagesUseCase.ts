export interface IGetUserMessagesUseCase{
    GetUserMessagesUse(adminId: string): Promise<any>;
} 