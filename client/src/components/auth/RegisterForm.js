import { useState } from 'react';
import styles from './AuthForm.module.css';

const RegisterForm = ({
    registerData,
    setRegisterData,
    changeStep
}) => {

    const [passwordType, setPasswordType] = useState({
        type: 'password',
        button: 'Show',
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

    const onSubmit = (e) => {
        e.preventDefault();
        changeStep('next');
    }

    return (
        <>

            <div className={styles.logoWrapper}>
                <i className={styles.logo}></i>
            </div>

            <div className={styles.authForm}>

                <form onSubmit={onSubmit}>
                    <div className={styles.formRow}>
                        <h2 className={styles.registerHeading}>Sign up to see photos and videos from your friends.</h2>
                    </div>

                    <div className={`${styles.formRow} ${registerData.email.length >= 1 && styles.filledInput}`}>
                        <input
                            onChange={setRegisterData}
                            type="text"
                            name='email'
                            id='email'

                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className={`${styles.formRow} ${registerData.fullName.length >= 1 && styles.filledInput}`}>
                        <input
                            onChange={setRegisterData}
                            type="text"
                            name='fullName'
                            id='fullName'

                        />
                        <label htmlFor="fullName">Full name</label>
                    </div>

                    <div className={`${styles.formRow} ${registerData.username.length >= 1 && styles.filledInput}`}>
                        <input
                            onChange={setRegisterData}
                            type="text"
                            name='username'
                            id='username'

                        />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className={`${styles.formRow} ${registerData.password.length >= 1 && styles.filledInput}`}>
                        <input
                            type={passwordType.type}
                            id='password'
                            name='password'
                            onChange={setRegisterData}
                            value={registerData.password}
                        />
                        <label htmlFor="password">Password</label>
                        {registerData.password.length >= 1 &&
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
                        <p className={styles.privacyPolicyText}>
                            <span>
                                By signing up, you agree to our Terms .
                                Learn how we collect, use and share your data in our
                                Privacy Policy and how we use cookies and similar
                                technology in our Cookies Policy .
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