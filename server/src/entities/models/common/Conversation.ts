export interface Conversation {
    _id?: string;
    userId: string;
    adminId: string;
    propertyId: string;
    lastMessage?: {
        text?: string;
        time?: Date | string;
        unread?: number;
    }
}
