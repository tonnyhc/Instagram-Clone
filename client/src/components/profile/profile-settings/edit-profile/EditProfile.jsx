import useFormState from "../../../../hooks/useFormState";
import { baseProfilePicturePath } from "../../../../utils/config";
import styles from "../ProfileSettings.module.css";

const EditProfile = () => {
  const [formData, setFormData] = useFormState({
    bio: "",
    gender: "",
  });

  const bioLength = formData.bio.length

  return (
    <article className={styles.settingsArticle}>
      <div className={styles.mainPart}>
        <h2 className={styles.title}>Edit profile</h2>
        <div className={styles.settingsContentWrapper}>
          <div className={styles.formRow}>
            <div className={styles.inputWrapper}>
              <div className={styles.profileImgWrapper}>
                <img src={baseProfilePicturePath} alt="Profile picture" />
              </div>
              <div>
                <p className={styles.usernameHeading}>https.tonny_</p>
                <div>
                  <button className={styles.changePictureBtn}>
                    Change profile picture
                  </button>
                </div>
              </div>
              <input type="file" hidden name="profilePic" />
            </div>
          </div>
          <form action="">
            <div className={styles.formRow}>
              <div className={styles.inputWrapper}>
                <label className={styles.label} htmlFor="bio">
                  Biography
                </label>
                <textarea
                    value={formData.bio}
                    onChange={setFormData}
                  maxLength="250"
                  className={styles.input}
                  name="bio"
                  id="bio"
                ></textarea>
              </div>
              <div className={styles.helperText}>
                <div className={styles.helperTextSeparator}></div>
                <span className={`${styles.helperTextLabel} ${bioLength > 250 && styles.helperTextLabelError}`}>{bioLength} / 250</span>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputWrapper}>
                <label className={styles.label} htmlFor="gender">
                  Gender
                </label>
                <select value={formData.gender} onChange={setFormData} className={styles.input} name="gender" id="gender">
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="other">Other</option>
                  <option value="none">Prefer not to say</option>
                </select>
              </div>
              <div className={styles.helperText}>
                <div className={styles.helperTextSeparator}></div>
                <span className={styles.helperTextLabel}>
                  This wont be a part of your public profile
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default EditProfile;
