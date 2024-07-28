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
  currentUser: UserType | null;
  error: null | string;
  loading: boolean;
  messages: Message[];
};

const initialState: UserStateType = {
  currentUser: null,
  error: null,
  loading: false,
  messages: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      state.messages = [];
    }
  }
});

export const { signInSuccess, setMessages, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;
