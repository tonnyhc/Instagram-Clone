import { useState } from "react";
import { Link } from "react-router-dom";

import useFormState from "../../hooks/useFormState";
import styles from "./AuthForm.module.css";
import RegisterForm from "./RegisterForm";
import EmailConfirmation from "./EmailConfirmation";
import { submitRegisterConfirmationCode } from "../../services/authServices";

const Register = () => {
  const [registerData, setRegisterData] = useFormState({
    email: "",
    full_name: "",
    username: "",
    password: "",
  });
  const [confirmationCode, setConfirmatioCode] = useFormState({
    'code': ''
  });
  const [currStep, setCurrStep] = useState(1);

  const changeStep = (action) => {
    if (action == "back" && currStep == 1) {
      return;
    }
    action == "next"
      ? setCurrStep((currStep) => currStep + 1)
      : setCurrStep((currStep) => currStep - 1);
  };

  const confirmEmail = async (e, code) => {
    e.preventDefault();
    const data = await submitRegisterConfirmationCode(code, registerData.email);
    return data;
  };


  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.upperSection}>
        {currStep == 1 && (
          <RegisterForm
            registerData={registerData}
            setRegisterData={setRegisterData}
            changeStep={changeStep}
          />
        )}
        {currStep == 2 && (
          <EmailConfirmation
            confirmationCode={confirmationCode}
            setConfirmatioCode={setConfirmatioCode}
            confirmEmail={confirmEmail}
          />
        )}
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.lowerBtnWrapper}>
          <p>Have an account ?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
