import { User } from "../../models/admin/User";

export interface IGetUserDataByPhoneUseCase{
    FindUserDataByPhone(phone: number): Promise<User | null>;
}