const profileReducer = (state, action) => {
    switch (action.type){
        case 'FETCH_PROFILE':
            return {
                ...state,
                ...action.payload
            };
        case "CHANGE_PROFILE_PICTURE":
            return {
                ...state,
                profile_picture: action.payload
            };
        case "FOLLOW-UNFOLLOW_USER":
            let followers = state.followers;
            if (!action.payload.data){
                followers = followers.filter(follower => follower.follower.id != action.payload.id);
            } else{
                followers = [...followers, action.payload.data]
            }
            return {
                ...state,
                friendship_status:{
                    ...state.friendship_status,
                    followed_by_viewer: !state.friendship_status.followed_by_viewer
                },
                followers: followers
            }
        
        default:
            return state
    }
};

export default profileReducer;