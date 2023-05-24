import { get, post } from "../api/api";

const url = 'profiles/'
const followUrl = 'followers/'

export const fetchLogedInProfile = async () => {
    try{
        const data = await get(url + 'my-profile/');
        return data;
    } catch(e){
        throw e;
    }
}


export const fetchProfileDetails = async (username) => {
    try {
        const data = await get(url + username);
        return data;
    } catch(e){
        throw e;
    }
};


export const updateProfilePicture = async (image) => {
    const body = new FormData();
    body.append('image', image)
    try{
        const data = await post(url + 'change-profile-picture/', body, 'formData');
        return data;
    } catch(e){
        throw e;
    }
};

export const removeProfilePicture = async () => {
    try{
        const data = await post(url + 'remove-profile-picture/');
        return data;
    } catch(e){
        throw e;
    }
};

export const followProfile = async (profileId) => {
    try{
        const data = await post(followUrl + 'follow/' + profileId + '/');
        return data;
    } catch(e){
        throw e;
    }
}