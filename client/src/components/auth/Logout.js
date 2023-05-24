import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {AuthDataContext} from '../../contexts/AuthContext'
import { logout } from "../../services/authServices";

const Logout = () => {
    const navigate = useNavigate();
    const {authUserData, userLogout} = useContext(AuthDataContext);

    logout(authUserData.token)
    .then(() => {
        userLogout();
        navigate('/');
    });

    return null;
}

export default Logout;