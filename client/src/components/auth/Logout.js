import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../services/authServices";
import { authActions } from "../../store/auth-slice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserData = useSelector((state) => state.auth.authUserData);

  useEffect(() => {
    logout(authUserData.token).then(() => {
      navigate("/");
      dispatch(authActions.userLogout());
    });
  }, []);

  return null;
};

export default Logout;
