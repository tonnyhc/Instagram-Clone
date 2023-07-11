import { useState } from "react";

const useFormState = (defaultState) => {
    const [fields, setFields] = useState(defaultState);

    const handleChange = (e) => {
        const { name, value, type, checked  } = e.target;
        setFields(prevFields => ({
            ...prevFields,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const changeDefaultState = (newDefaultState) => {
        setFields(newDefaultState);
    }

    return [fields, handleChange, changeDefaultState];
};

export default useFormState;