export interface IGetConversationListUseCase{
  FilterOutAllConversationList(adminId: string, page: number, propertyFilter: string, startDate: any, endDate: any):Promise<any>;
  FindConversationListCount(adminId: string): Promise<any>
}