import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";



const getInitialAuthStateFromLocalStorage = () => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : {}
}

const setAuthDataToLocalStorage = (data) => {
    localStorage.setItem('userData', JSON.stringify(data))
}

const initialAuthState = getInitialAuthStateFromLocalStorage()

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUserData: initialAuthState,
        csrfToken: Cookies.get('csrftoken'),
        isAuth: initialAuthState.token ? true : false

    },
    reducers: {
        userLogin(state, action) {
            state.authUserData = action.payload;
            state.isAuth = action.payload.token ? true : false
            setAuthDataToLocalStorage(action.payload);
        },
        userLogout(state) {
            state.authUserData = {};
            state.isAuth = false;
            setAuthDataToLocalStorage({});
        },
        userConfirmEmail(state) {
            state.authUserData.is_confirmed = true;
            setAuthDataToLocalStorage(state.authUserData);
        },
    }
});


export const authActions = authSlice.actions;
export default authSlice;