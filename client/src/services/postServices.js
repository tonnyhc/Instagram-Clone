import { post } from "../api/api"

const postsUrl = "posts/"
const contentType = 'formData'

export const createPost = async (body) => {
    try{
        const url = postsUrl + 'create/';
        const data = await post(url, body, contentType);
        return data;
    } catch(e){
        throw e;
    }
}