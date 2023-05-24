import { createContext, useState } from "react";

import Cookies from "js-cookie";

import useLocalStorage from "../hooks/useLocalStorage";

export const AuthDataContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUserData, setAuthUserData] = useLocalStorage("userData", {});
  const [csrfToken, setCsrfToken] = useState(Cookies.get("csrftoken"));

  const userLogin = (authData) => {
    setAuthUserData(authData);
  };

  const userLogout = () => {
    setAuthUserData({});
  };

  const userConfirmEmail = () => {
    const newUserData = { ...authUserData, is_confirmed: true };
    setAuthUserData(newUserData);
  };

  const context = {
    authUserData,
    csrfToken,
    isAuth: authUserData.token ? true : false,
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
