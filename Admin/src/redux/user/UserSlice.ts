import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userStateType = {
    currentUser: string | null;
    error: null | string;
    loading: boolean;
};

const initialState: userStateType = {
    currentUser: null,
    error: null,
    loading: false
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
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { signInSuccess,  signoutSuccess } = userSlice.actions;

export default userSlice.reducer;
