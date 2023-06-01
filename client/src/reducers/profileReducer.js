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
            let followers_count = state.followers_count;
            if (!action.payload.data){
                followers = followers.filter(follower => follower.profile_id != action.payload.id);
                followers_count -- ;
            } else{
                followers = [...followers, action.payload.data];
                followers_count ++ ;
            }
            return {
                ...state,
                friendship_status:{
                    ...state.friendship_status,
                    followed_by_viewer: !state.friendship_status.followed_by_viewer
                },
                followers: followers,
                followers_count: followers_count
            };
        
        default:
            return state
    }
};

export default profileReducer;