import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Slices/AuthSlice';

export const Store = configureStore({
    reducer: {
        auth: AuthReducer
    },

    devTools: true

});