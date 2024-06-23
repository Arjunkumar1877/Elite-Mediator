
export interface IUpdateConversationReadCountToZeroUseCase{
    UpdateConversationReadCount(id: string): Promise<any>;
}