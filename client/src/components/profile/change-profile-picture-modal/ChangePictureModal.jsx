import { useContext } from "react";
import { removeProfilePicture } from "../../../services/profileServices";
import Modal from "../../modal/Modal";

import styles from "./ChangePictureModal.module.css";
import { UserContext } from "../../../contexts/ProfileContext";

const ChangePictureModal = ({ closeFunc, openFileInput, setProfile }) => {
  const {setUserData} = useContext(UserContext);

  const removePicture = async (e) => {
    try{
      const data = await removeProfilePicture();
      setUserData(oldData => ({
        ...oldData,
        'profile_picture': data
      }));
      setProfile({
        type: "CHANGE_PROFILE_PICTURE",
        payload: data
      })
      closeFunc();
    } catch(e){
      alert(e);
    }
  }

  return (
    <Modal title="Change Profile Picture" size="medium" closeFunc={closeFunc}>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <button onClick={openFileInput} className={`${styles.btn} ${styles.uploadBtn}`}>Upload Photo</button>
        </div>
        <div className={styles.row}>
          <button onClick={removePicture} className={`${styles.btn} ${styles.removeBtn}`}>Remove Current Photo</button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePictureModal;
