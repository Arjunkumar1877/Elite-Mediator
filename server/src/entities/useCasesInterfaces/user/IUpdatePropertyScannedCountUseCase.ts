
export interface IUpdatePropertyScannedCountUseCase{
   UpdateScannedCount(propId: string): Promise<string>;
   
}