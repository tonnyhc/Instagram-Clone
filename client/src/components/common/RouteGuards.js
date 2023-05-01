import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthDataContext } from "../../contexts/AuthContext";

export const AuthGuard = ({ children }) => {
  const { isAuth } = useContext(AuthDataContext);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};
