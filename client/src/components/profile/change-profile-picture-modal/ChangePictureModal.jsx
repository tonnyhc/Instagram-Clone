import { useState, useEffect } from "react";

import {
  removeProfilePicture,
  updateProfilePicture,
} from "../../../services/profileServices";

import ProfilePicture from "../../common/profile-picture/ProfilePicture";
import Modal from "../../modal/Modal";

import { baseProfilePicturePath } from "../../../utils/config";
import styles from "./ChangePictureModal.module.css";
import { useDispatch } from "react-redux";
import { userProfileActions } from "../../../store/user-profile-slice";


const ChangePictureModal = ({
  pictureInputRef,
  pictureSrc,
  setProfile,
  newProfilePicture,

  pictureWidth,
  pictureHeigth,
}) => {
  const dispatch = useDispatch();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (!newProfilePicture) {
      return;
    }

    const changePicture = async () => {
      try {
        const data = await updateProfilePicture(newProfilePicture);
        // The dispatch is setting the new profile picture in the Redux state to be used by the navigation
        dispatch(userProfileActions.changeProfilePicture(data));  
        // The setProfile is setting the new profile picture in the ProfileDetails state      
        setProfile({
          type: "CHANGE_PROFILE_PICTURE",
          payload: data,
        });
        setIsModalOpened(false);
      } catch (e) {
        alert(e);
      }
    };

    changePicture();
  }, [newProfilePicture]);

  const removePicture = async (e) => {
    try {
      const data = await removeProfilePicture();
       // The dispatch is setting the new profile picture in the Redux state to be used by the navigation
      dispatch(userProfileActions.changeProfilePicture(data)); 
      // The setProfile is setting the new profile picture in the ProfileDetails state
      setProfile({
        type: "CHANGE_PROFILE_PICTURE",
        payload: null,
      });
      setIsModalOpened(false)
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className={styles.profilePicture}>
        {pictureSrc ? (
          <button
            onClick={() => setIsModalOpened(true)}
            className={styles.changePicBtn}
            title="Change profile picture"
          >
            <ProfilePicture
              width={pictureWidth}
              height={pictureHeigth}
              src={pictureSrc}
              alt="User profile picture"
            />
          </button>
        ) : (
          <button
            className={styles.changePicBtn}
            onClick={() => pictureInputRef.current.click()}
            title="Add a profile photo"
          >
            <ProfilePicture
              width={pictureWidth}
              height={pictureHeigth}
              src={baseProfilePicturePath}
              alt="Add profile picture"
            />
          </button>
        )}
      </div>
      {isModalOpened && (
        <Modal
          title="Change Profile Picture"
          size="medium"
          closeFunc={() => setIsModalOpened(false)}
        >
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <button
                onClick={() => pictureInputRef.current.click()}
                className={`${styles.btn} ${styles.uploadBtn}`}
              >
                Upload Photo
              </button>
            </div>
            <div className={styles.row}>
              <button
                onClick={removePicture}
                className={`${styles.btn} ${styles.removeBtn}`}
              >
                Remove Current Photo
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ChangePictureModal;
