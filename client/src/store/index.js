import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userProfileSlice from "./user-profile-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userProfile: userProfileSlice.reducer
    }
});


export default store;