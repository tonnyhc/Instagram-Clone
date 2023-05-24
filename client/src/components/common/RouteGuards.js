import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthDataContext } from "../../contexts/AuthContext";

const restrictedRoutes = ['/login', '/register'];

export const AuthGuard = ({ children, }) => {
  const { isAuth, authUserData } = useContext(AuthDataContext);

  if (!isAuth) {
    return <Navigate to="/login" />;
  };
  if (!authUserData.is_confirmed) {
    return <Navigate to='/register' />
  };


  return children ? children : <Outlet />;
};
