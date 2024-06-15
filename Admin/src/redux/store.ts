import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './admin/adminSlice';
import userReducer from './user/UserSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PersistConfig } from "redux-persist";


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    version: 1
}


const persistedReducer = persistReducer(persistConfig, adminReducer);
const persistedReduce = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        admin: persistedReducer,
        user: persistedReduce
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store);

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;