export interface Admin {
    username: string;
    email: string;
    phone: number;
    password: string;
    address?: string | null;
    state?: string | null;
    city?: string | null;
    pinccode?: number | null;
    verified?: boolean
    firebaseConfirm?: string | null;
    image?: string;

}