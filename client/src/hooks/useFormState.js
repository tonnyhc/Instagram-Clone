import { useState } from "react";

const useFormState = (defaultState) => {
    const [fields, setFields] = useState(defaultState);

    const handleChange = (e) => {
        const { name, value, type, checked  } = e.target;
        console.log(e.target.type)
        setFields(prevFields => ({
            ...prevFields,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return [fields, handleChange];
};

export default useFormState;