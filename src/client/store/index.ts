import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { certsAPI } from './services/certs';

export const setupStore = () => {
    const store = configureStore({
        reducer: {
            [certsAPI.reducerPath]: certsAPI.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(certsAPI.middleware)
    });

    setupListeners(store.dispatch);

    return store;
}