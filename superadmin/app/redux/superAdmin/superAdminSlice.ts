import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialStateType = {
    currentSuperAdmin: string | null;
    error: null | string;
    loading: boolean;
}

const initialState: InitialStateType = {
    currentSuperAdmin: null,
    error: null,
    loading: false
}


const superAdminSlice = createSlice({
    name: "superAdmin",
    initialState,
    reducers: {
        signInSuccess: (state, action: PayloadAction<string>)=>{
          state.currentSuperAdmin = action.payload;
          state.loading = false;
          state.error = null;
        },
        signOutSuccess: (state)=>{
            state.currentSuperAdmin = null;
            state.error = null;
            state.loading = false;
        }
    }
})

export const { signInSuccess, signOutSuccess } = superAdminSlice.actions;
export default superAdminSlice.reducer;