export interface  IGetUsersListUseCase{
    GetTheUserList(id: string): Promise<any>;
}