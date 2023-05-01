import { createContext, useState } from "react";

import Cookies from "js-cookie";

import useLocalStorage from "../hooks/useLocalStorage";

export const AuthDataContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [csrfToken, setCsrfToken] = useState(Cookies.get("csrftoken"));

  const userLogin = (authData) => {
    setUserData(authData);
  };

  const userLogout = () => {
    setUserData({});
  };

  const context = {
    userData,
    csrfToken,
    isAuth: userData.token ? true : false ,
    userLogin,
    userLogout,
  };

  return (
    <AuthDataContext.Provider value={context}>
      {children}
    </AuthDataContext.Provider>
  );
};
