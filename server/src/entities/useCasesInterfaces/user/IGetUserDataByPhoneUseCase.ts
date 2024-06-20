import { User } from "../../models/user/User";

export interface IGetUserDataByPhoneUseCase{
    FindUserDataByPhone(phone: number): Promise<User | null | any>;
}