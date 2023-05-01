import { useState } from "react";
import styles from "./AuthForm.module.css";
import { register } from "../../services/authServices";

const RegisterForm = ({ registerData, setRegisterData, changeStep }) => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    full_name: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState({
    type: "password",
    button: "Show",
  });

  // Function to show and hide the password
  const changePassType = (e) => {
    setPasswordType((oldPass) =>
      oldPass.type == "password"
        ? {
            type: "text",
            button: "Hide",
          }
        : {
            type: "password",
            button: "Show",
          }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(registerData);
      changeStep("next");
    } catch (e) {
        setFormErrors(oldErrors => ({
            ...oldErrors,
            ...e
        }))
    }
  };

  return (
    <>
      <div className={styles.logoWrapper}>
        <i className={styles.logo}></i>
      </div>

      <div className={styles.authForm}>
        <form onSubmit={onSubmit}>
          <div className={styles.formRow}>
            <h2 className={styles.registerHeading}>
              Sign up to see photos and videos from your friends.
            </h2>
          </div>

          <div
            className={`${styles.formRow} ${
              registerData.email.length >= 1 && styles.filledInput
            }`}
          >
            <input
              onChange={setRegisterData}
              type="text"
              name="email"
              id="email"
            />
            <label htmlFor="email">Email</label>
            {formErrors.email && (<p className={styles.formError}>{formErrors.email}</p>) }
          </div>

          <div
            className={`${styles.formRow} ${
              registerData.full_name.length >= 1 && styles.filledInput
            }`}
          >
            <input
              onChange={setRegisterData}
              type="text"
              name="full_name"
              id="full_name"
            />
            <label htmlFor="full_name">Full name</label>
          </div>

          <div
            className={`${styles.formRow} ${
              registerData.username.length >= 1 && styles.filledInput
            }`}
          >
            <input
              onChange={setRegisterData}
              type="text"
              name="username"
              id="username"
            />
            <label htmlFor="username">Username</label>
            {formErrors.username && (<p className={styles.formError}>{formErrors.username}</p>) }
          </div>

          <div
            className={`${styles.formRow} ${
              registerData.password.length >= 1 && styles.filledInput
            }`}
          >
            <input
              type={passwordType.type}
              id="password"
              name="password"
              onChange={setRegisterData}
              value={registerData.password}
            />
            <label htmlFor="password">Password</label>
            {registerData.password.length >= 1 && (
              <span className={styles.showPassword} onClick={changePassType}>
                {passwordType.button}
              </span>
            )}
            {formErrors.password && (<p className={styles.formError}>{formErrors.password}</p>) }
          </div>

          <div className={styles.formRow}>
            <p className={styles.privacyPolicyText}>
              <span>
                By signing up, you agree to our Terms . Learn how we collect,
                use and share your data in our Privacy Policy and how we use
                cookies and similar technology in our Cookies Policy .
              </span>
            </p>
          </div>

          <div className={styles.formRow}>
            <button>Next</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
