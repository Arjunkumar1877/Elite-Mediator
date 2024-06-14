export interface User{
    userId: string;
    username: string;
    phone: number;
    purpose: string;
    firebaseCode?: string;
    verified?: boolean;

}