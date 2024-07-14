export interface IDeleteUserDataUseCase{
  DeleteUserDataAndConversation(userId: string): Promise<string>;
}