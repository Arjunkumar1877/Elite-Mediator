export interface ICreateConversationUseCase{
    CreateConvesationUseCase(userId: string, adminId: string, propertyId: string): Promise<any>;
}