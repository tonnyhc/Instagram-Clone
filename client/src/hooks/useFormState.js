import { useState, useEffect } from "react";

const useFormState = (defaultState) => {
    const [fields, setFields] = useState(defaultState);

    useEffect(() => {
        setFields(defaultState);
      }, [defaultState]);

    const handleChange = (e) => {
        const { name, value, type, checked  } = e.target;
        setFields(prevFields => ({
            ...prevFields,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return [fields, handleChange];
};

export default useFormState;