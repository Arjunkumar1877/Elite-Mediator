import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderModel: "User" | "Admin";
  text: string;
  createdAt: string;
  senderName?: string;
}

type UserType = {
  _id?: string;
  userId: string;
  adminId: string;
  propId: string;
  username: string;
  purpose: string;
  phone: number | string;
  firebaseCode?: string;
  verified?: boolean;
  conversationId?: string;
};

type UserStateType = {
  currentSuperAdmin: UserType | null;
  error: null | string;
  loading: boolean;
  messages: Message[];
};

const initialState: UserStateType = {
  currentSuperAdmin: null,
  error: null,
  loading: false,
  messages: [],
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<UserType>) => {
      state.currentSuperAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },
    signoutSuccess: (state) => {
      state.currentSuperAdmin = null;
      state.error = null;
      state.loading = false;
      state.messages = [];
    }
  }
});

export const { signInSuccess, setMessages, signoutSuccess } = superAdminSlice.actions;

export default superAdminSlice.reducer;
