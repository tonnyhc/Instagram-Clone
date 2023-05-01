import styles from './AuthForm.module.css'


const EmailConfirmation = ({
    confirmationCode,
    setConfirmatioCode,
    confirmEmail
}) => {

    return (
        <div className={styles.confirmationWrapper}>
            <div className={styles.formRow}>
                <span className={styles.envelopePicture}></span>
            </div>

            <div className={styles.formRow}>
                <h3>Enter Confirmation Code</h3>
            </div>

            <div className={styles.formRow}>
                <p>Enter the confirmation code we sent to tonipetrov121@gmail.com. </p>
            </div>

            <form onSubmit={confirmEmail}>

                <div className={styles.formRow}>
                    <input 
                    type="text" 
                    name='code' 
                    id='emailConfirmCode' 
                    placeholder="Confirmation code" 
                    value={confirmationCode.code}
                    onChange={setConfirmatioCode}
                    />
                </div>
                <div className={styles.formRow}>
                    <button
                    className={confirmationCode.code.length < 6 && styles.disabledBtn}
                    >Next</button>

                </div>
                <div className={styles.formRow}>
                    <button className={styles.backButton}>Go back</button>
                </div>
            </form>

        </div>
    );
};


export default EmailConfirmation;