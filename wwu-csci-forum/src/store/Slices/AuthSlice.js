import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    username: ''
}
const initialState = {
    user: initialUserState,
    loaded: false
}

export const AuthSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.loaded = true;
        },
        logout: (state) => {
            state.user = initialUserState;
        },
        loader: (state) => {
            state.loaded = true;
        }
    },
})

export const { login, logout, loader } = AuthSlice.actions;
export default AuthSlice.reducer;