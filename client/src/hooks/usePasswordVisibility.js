import { useState } from "react";

const usePasswordVisibility = () => {
    // State holding the password type eg: text or password
    // This 2 (passType and changePassType) can go into a hook
    const [passwordType, setPasswordType] = useState({
        type: 'password',
        button: 'Show'
    });

    // Function to show and hide the password
    const changePassType = (e) => {
        setPasswordType(oldPass =>
            oldPass.type == 'password' ? {
                type: 'text',
                button: "Hide"
            }
                :
                {
                    type: 'password',
                    button: "Show"
                })
    };

    return [
        passwordType,
        changePassType
    ]
};

export default usePasswordVisibility;