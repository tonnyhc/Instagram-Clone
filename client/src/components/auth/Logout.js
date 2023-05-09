import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {AuthDataContext} from '../../contexts/AuthContext'
import { logout } from "../../services/authServices";

const Logout = () => {
    const navigate = useNavigate();
    const {userData, userLogout} = useContext(AuthDataContext);

    logout(userData.token)
    .then(() => {
        userLogout();
        navigate('/');
    });

    return null;
}

export default Logout;