import { createSlice } from '@reduxjs/toolkit';

const initState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setCredentials: (state, { payload: { user, token } }) => {
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;
        },
        removeCredentials: () => initState,
        setCurrentUser: (state, { payload }) => {
            state.user = { ...payload };
            state.isLoggedIn = true;
        },
    },
});

export default authSlice.reducer;

export const { setCredentials, removeCredentials, setCurrentUser } =
    authSlice.actions;

export const getUserName = state => state.auth.user.name;
export const getToken = state => state.auth.token;
export const getUser = state => state.auth.user;
export const getIsLogedIn = state => state.auth.isLoggedIn;