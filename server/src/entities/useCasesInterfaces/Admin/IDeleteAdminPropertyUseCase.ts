
export interface IDeleteAdminPropertyUseCase{
  DeleteAdminsProperty(propId: string): Promise<boolean>;
}