import { createSlice } from "@reduxjs/toolkit";

//initialize 
const initialState = {
    username: ''
}

export const AuthSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload;
        },
        logout: (state) => {
            state.username = ''
        },
    },
})

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;