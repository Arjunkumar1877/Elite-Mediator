export interface User{
    userId: string,
    adminId: string,
    propId: string,
    username: string;
    purpose: string;
    phone: number;
    firebaseCode?: string;
    verified: boolean;
    conversationId?: string;
    macId?: string;
    deleted?: boolean;
}