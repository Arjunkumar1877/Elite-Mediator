import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
  conversationId: string;
  messages: string;
};

type userStateType = {
  currentUser: string | null;
  error: null | string;
  loading: boolean;
  messages: Message[];
};

const initialState: userStateType = {
  currentUser: null,
  error: null,
  loading: false,
  messages: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
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
