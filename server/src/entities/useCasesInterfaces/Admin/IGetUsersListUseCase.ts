export interface  IGetUsersListUseCase{
    GetTheUserList(adminId: string, startDate: string, endDate: string, propertyName: string, userType: string): Promise<any>;
}