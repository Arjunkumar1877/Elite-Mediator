export interface Admin {
    username: string;
    email: string;
    phone: number;
    password: string;
    address?: string | null;
    state?: string | null;
    city?: string | null;
    pincode?: number | null;
    verified?: boolean
    firebaseConfirm?: string | null;
    image?: string
    landmark?: string
    fcmToken?: string
    createdAt?: number;
    updatedAt?: number
}