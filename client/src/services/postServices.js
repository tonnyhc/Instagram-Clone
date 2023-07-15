import { post,get } from "../api/api";

const postsUrl = "posts/";
const contentType = "formData";

export const createPost = async (body) => {
  try {
    const url = postsUrl + "create/";
    const data = await post(url, body, contentType);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getProfilePosts = async (username) => {
  try {
    const url = postsUrl + "get/" + username;
    const data = await get(url);
    return data;
  } catch (e) {
    throw e;
  }
};
