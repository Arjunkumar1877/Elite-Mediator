import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
    currentAdmin: string | null;
    error: null | string;
    loading: boolean;
    conversation: any[]; 
};

const initialState: InitialStateType = {
    currentAdmin: null,
    error: null,
    loading: false,
    conversation: [] 
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action: PayloadAction<string>) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setConversation: (state, action: PayloadAction<any[]>) => {
            state.conversation = Array.isArray(action.payload) ? action.payload : [];
        },
        signoutSuccess: (state) => {
            state.currentAdmin = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { signInSuccess, signInStart, signInFailure, setConversation, signoutSuccess } = adminSlice.actions;

export default adminSlice.reducer;
