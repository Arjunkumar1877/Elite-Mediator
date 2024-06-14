import { configureStore } from "@reduxjs/toolkit";
import userReducer from './admin/adminSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PersistConfig } from "redux-persist";


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    version: 1
}


const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        admin: persistedReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store);

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;