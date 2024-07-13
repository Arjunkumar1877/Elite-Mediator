
export type GraphDataType = {
     All: number;
     unknown: number;
     verified: number;
     unVerified: number
}
export interface  IUserStatisticsGraphDataUseCase{
     GetUserStatisticGraphData(adminId: string): Promise<GraphDataType>;

}