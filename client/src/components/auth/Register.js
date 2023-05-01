import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useFormState from "../../hooks/useFormState";
import styles from "./AuthForm.module.css";
import RegisterForm from "./RegisterForm";
import EmailConfirmation from "./EmailConfirmation";
import { submitRegisterConfirmationCode } from "../../services/authServices";
import { AuthDataContext } from "../../contexts/AuthContext";

const Register = ({ step }) => {
  const { userData, userConfirmEmail, userLogin } = useContext(AuthDataContext);
  const [registerData, setRegisterData] = useFormState({
    email: userData.email || "",
    full_name: "",
    username: "",
    password: "",
  });
  const [confirmationCode, setConfirmationCode] = useFormState({
    code: "",
  });
  const [currStep, setCurrStep] = useState(userData.email ? 2 : 1);

  const navigate = useNavigate();

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
    try{
      const data = await submitRegisterConfirmationCode(confirmationCode.code, registerData.email);
      userLogin(data);
      navigate('/');
      userConfirmEmail();
      return data;
    } catch(e){
      alert(e);
    }
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
            setConfirmationCode={setConfirmationCode}
            confirmEmail={confirmEmail}
            email={registerData.email}
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
