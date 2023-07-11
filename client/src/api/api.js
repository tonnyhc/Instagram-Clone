import {apiHost} from "../utils/config";
import { createBodyForMultipartFormData } from "../utils/helperFunctions";

const requester = async (url, method, body, contentType, token) => {
  const host = apiHost + "/api/";

  if (!token) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    token = userData ? userData.token : null;
  }

  const headers = {
    Authorization: `Token ${token}`,
  };

  // Checking if the content type is multipart/form-data or a JSON
  if (!contentType) {
    headers["Content-Type"] = "application/json";
  };
  let finalBody;
  if (contentType == 'formData'){
    finalBody = createBodyForMultipartFormData(body);
  } else {
    finalBody = JSON.stringify(body);
  }

  const options = {
    method: method,
    headers: headers,
    body: finalBody,
  };

  try {
    const response = await fetch(host + url, options);
    if (response.status == 204){
      return response;
    }
    if (!response.ok) {
      const data = await response.json();
      throw data;
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const post = async (url, body, contentType) => {
  try {
    const data = await requester(url, "POST", body, contentType);
    return data;
  } catch (e) {
    throw e;
  }
};

export const get = async (url) => {
  try {
    const data = await requester(url, "GET");
    return data;
  } catch (e) {
    throw e;
  }
};


export const patch = async (url, body, contentType) => {
  try{
    const data = await requester(url, "PATCH", body, contentType)
    return data;
  } catch(e){
    throw e;
  }
};