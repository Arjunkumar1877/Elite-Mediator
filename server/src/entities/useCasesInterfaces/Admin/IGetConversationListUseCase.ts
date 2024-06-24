export interface IGetConversationListUseCase{
  FilterOutAllConversationList(adminId: string, page: string, limit: string, filter: string):Promise<any>;
  FindConversationListCount(adminId: string): Promise<any>
}