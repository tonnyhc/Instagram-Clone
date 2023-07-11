import { useEffect, useRef, useState } from "react";
import useFormState from "../../../../hooks/useFormState";
import Button from "../../../common/button/Button";
import styles from "../ProfileSettings.module.css";
import {
  fetchProfileDetailsForEdit,
  updateProfileDetails,
} from "../../../../services/profileServices";
import ChangePictureModal from "../../change-profile-picture-modal/ChangePictureModal";

const EditProfile = () => {
  const [fetchedData, setFetchedData] = useState({
    bio: "",
    gender: "",
    username: "",
    profile_picture: "",
  });

  const [formData, setFormData, changeDefaultState] = useFormState(fetchedData);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchProfileDetailsForEdit();
      setFetchedData(data);
      changeDefaultState(data);
    })();
  }, []);

  const onSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProfileDetails(formData);
      console.log(data);
      return data;
    } catch (e) {
      alert(e);
    }
  };

  const pictureInputRef = useRef(null);
  const bioLength = (formData.bio || "").length;

  return (
    <article className={styles.settingsArticle}>
      <div className={styles.mainPart}>
        <h2 className={styles.title}>Edit profile</h2>
        <div className={styles.settingsContentWrapper}>
          <div className={styles.formRow}>
            <div className={styles.inputWrapper}>
              <div className={styles.label}>
                <div className={styles.profilePictureWrapper}>
                  <ChangePictureModal
                    pictureInputRef={pictureInputRef}
                    pictureSrc={formData.profile_picture}
                    pictureHeigth="50px"
                    pictureWidth="50px"
                    newProfilePicture={newProfilePicture}
                  />
                  <form action="">
                    <input
                      type="file"
                      onChange={(e) => setNewProfilePicture(e.target.files[0])}
                      hidden
                      ref={pictureInputRef}
                    />
                  </form>
                </div>
              </div>
              <div className={styles.usernameWrapper}>
                <p className={styles.usernameHeading}>{formData.username}</p>
                <div>
                  <button className={styles.changePictureBtn}>
                    Change profile picture
                  </button>
                </div>
              </div>
              <input type="file" hidden name="profilePic" />
            </div>
          </div>
          <form action="" onSubmit={onSubmitEdit}>
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
                <span
                  className={`${styles.helperTextLabel} ${
                    bioLength > 250 && styles.helperTextLabelError
                  }`}
                >
                  {bioLength} / 250
                </span>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputWrapper}>
                <label className={styles.label} htmlFor="gender">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={setFormData}
                  className={styles.input}
                  name="gender"
                  id="gender"
                >
                  <option value="Man">Man</option>
                  <option value="Woman">Woman</option>
                  <option value="Other">Other</option>
                  <option value="PreferNotToSay">Prefer not to say</option>
                </select>
              </div>
              <div className={styles.helperText}>
                <div className={styles.helperTextSeparator}></div>
                <span className={styles.helperTextLabel}>
                  This wont be a part of your public profile
                </span>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.helperText}>
                <div className={styles.helperTextSeparator}></div>
                <div className={styles.helperTextLabel}>
                  <Button text="Submit" type="primary" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default EditProfile;
