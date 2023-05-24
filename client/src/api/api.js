import config from "../utils/config";

const requester = async (url, method, body, contentType, token) => {
  const host = config.apiHost + "/api/";

  if (!token) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    token = userData ? userData.token : null;
  }

  const headers = {
    Authorization: `Token ${token}`,
  };

  if (contentType == "formData") {
  } else {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method: method,
    headers: headers,
    body: contentType == "formData" ? body : JSON.stringify(body),
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
