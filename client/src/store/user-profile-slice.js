import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        userData: {
            profile_picture: "",
            username: ""
        }
    },
    reducers: {
        setInitalData(state, action) {
            state.userData = action.payload;
        },
        changeProfilePicture(state,action) {
            state.userData.profile_picture = action.payload;
        }
    }
});


export const userProfileActions = userProfileSlice.actions;
export default userProfileSlice;