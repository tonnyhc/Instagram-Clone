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

  const userConfirmEmail = () => {
    const newUserData = { ...userData, is_confirmed: true };
    setUserData(newUserData);
  };

  const context = {
    userData,
    csrfToken,
    isAuth: userData.token ? true : false,
    userLogin,
    userLogout,
    userConfirmEmail,
  };

  return (
    <AuthDataContext.Provider value={context}>
      {children}
    </AuthDataContext.Provider>
  );
};
