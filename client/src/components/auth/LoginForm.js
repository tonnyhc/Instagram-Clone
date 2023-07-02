import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../../hooks/useFormState";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
import { login } from "../../services/authServices";

import styles from "./AuthForm.module.css";
import { authActions } from "../../store/auth-slice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [passwordType, setPasswordType] = usePasswordVisibility();
  const [loginData, setLoginData] = useFormState({
    email_or_username: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      dispatch(authActions.userLogin(data));
      // TODO: when the user logs in to fetch the profile data and set it in the Redux user-profile-slice
      navigate('/');
      return data;
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.upperSection}>
        <div className={styles.logoWrapper}>
          <i className={styles.logo}></i>
        </div>

        <div className={styles.authForm}>
          <form method="post" onSubmit={onLogin}>
            <div
              className={`${styles.formRow} ${
                loginData.email_or_username.length >= 1 && styles.filledInput
              }`}
            >
              <input
                type="text"
                name="email_or_username"
                id="email_or_username"
                onChange={setLoginData}
                value={loginData.email_or_username}
              />
              <label htmlFor="email_or_username">Email or username</label>
            </div>

            <div
              className={`${styles.formRow} ${
                loginData.password.length >= 1 && styles.filledInput
              }`}
            >
              <input
                type={passwordType.type}
                id="password"
                name="password"
                onChange={setLoginData}
                value={loginData.password}
              />
              <label htmlFor="password">Password</label>
              {loginData.password.length >= 1 && (
                <span className={styles.showPassword} onClick={setPasswordType}>
                  {passwordType.button}
                </span>
              )}
            </div>

            <div className={styles.formRow}>
              <button>Log in</button>
            </div>

            <div className={styles.formRow}>
              <div className={styles.authSeparator}>
                <div className={styles.separator}></div>
                <span>or</span>
                <div className={styles.separator}></div>
              </div>
            </div>

            <div className={styles.formRow}>
              <a className={styles.forgottenPass} href="#">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.lowerBtnWrapper}>
          <p>Don't have an account?</p>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
