import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import superAdminSlice from "./superAdmin/superAdminSlice";


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    version: 1
}


const persistedReducer = persistReducer(persistConfig, superAdminSlice);

export const store = configureStore({
    reducer: {
        user: persistedReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store);

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;