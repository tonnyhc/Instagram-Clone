import { useState } from "react";

const useFormState = (defaultState) => {
    const [fields, setFields] = useState(defaultState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(prevFields => ({
            ...prevFields,
            [name]: value
        }));
    };

    return [fields, handleChange];
};

export default useFormState;