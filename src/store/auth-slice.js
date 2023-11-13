import { createSlice } from "@reduxjs/toolkit";

const initialAuthstate = {
    token: localStorage.getItem('user'),
    userEmail: localStorage.getItem('userEmail'),
    isLoggedIn: localStorage.getItem('isLoggedId'),
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthstate,
    reducers:{
        login (state, action) {
            state.token = action.payload.token;
            state.userEmail = action.payload.email;
            localStorage.setItem('user', action.payload.token);
            localStorage.setItem('userEmail', action.payload.email);
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', true);
        },

        logout (state) {
            state.token = null;
            state.userEmail = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userEmail');
            state.isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;