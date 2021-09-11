import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactsApi } from './phonebookApi';
import { usersApi } from './userApi';
import auth from './authSlice';

const userPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: persistReducer(userPersistConfig, auth),
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        contactsApi.middleware,
        usersApi.middleware,
    ],
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);