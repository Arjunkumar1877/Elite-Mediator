import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
    currentAdmin: string | null;
    error: null | string;
    loading: boolean;
};

const initialState: InitialStateType = {
    currentAdmin: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
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
        signoutSuccess: (state) => {
            state.currentAdmin = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { signInSuccess, signInStart, signInFailure, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;
