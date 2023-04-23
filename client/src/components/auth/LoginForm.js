import { Link } from 'react-router-dom';
import styles from './AuthForm.module.css';
import { useState } from 'react';
import useFormState from '../../hooks/useFormState';

const LoginForm = () => {
    const [loginData, setLoginData] = useFormState({
        'email': '',
        'password': '',
    })
    // State holding the password type eg: text or password
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
    }

    return (
        <div className={styles.sectionWrapper}>

            <div className={styles.upperSection}>

                <div className={styles.logoWrapper}>
                    <i className={styles.logo}></i>
                </div>

                <div className={styles.authForm}>
                    <form>

                        <div className={`${styles.formRow} ${loginData.email.length >= 1 && styles.filledInput}`}>
                            <input
                                type="text"
                                name='email'
                                id='email'
                                onChange={setLoginData}
                                value={loginData.email}
                            />
                            <label htmlFor="email">Email or username</label>
                        </div>

                        <div className={`${styles.formRow} ${loginData.password.length >= 1 && styles.filledInput}`}>
                            <input
                                type={passwordType.type}
                                id='password'
                                name='password'
                                onChange={setLoginData}
                                value={loginData.password}
                            />
                            <label htmlFor="password">Password</label>
                            {loginData.password.length >= 1 && 
                                (
                                    <span
                                        className={styles.showPassword}
                                        onClick={changePassType}
                                    >
                                        {passwordType.button}
                                    </span>
                                )
                            }

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
                            <a className={styles.forgottenPass} href="#">Forgot password?</a>
                        </div>

                    </form>
                </div>

            </div>

            <div className={styles.lowerSection}>
                <div className={styles.lowerBtnWrapper}>
                    <p>Don't have an account?</p>
                    <Link to='/register' >Sign up</Link>
                </div>
            </div>
        </div>
    );
};


export default LoginForm;