import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './admin/adminSlice';
import userReducer from './user/UserSlice';
import superAdminReducer from './superAdmin/SuperAdminSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PersistConfig } from "redux-persist";


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    version: 1
}


const persistedReducerAdmin = persistReducer(persistConfig, adminReducer);
const persistedReducerUser = persistReducer(persistConfig, userReducer);
const persistedReducerSuperAdmin = persistReducer(persistConfig, superAdminReducer);

export const store = configureStore({
    reducer: {
        admin: persistedReducerAdmin,
        user: persistedReducerUser,
        superAdmin: persistedReducerSuperAdmin
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store);

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;