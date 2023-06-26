// import { useContext, useState, useEffect } from "react";

// import { UserContext } from "../../../contexts/ProfileContext";
// import { removeProfilePicture, updateProfilePicture } from "../../../services/profileServices";

// import Modal from "../../modal/Modal";
// import styles from "./ChangePictureModal.module.css";

// // const ChangePictureModal = ({ closeFunc, openFileInput, setProfile }) => {
// //   const {setUserData} = useContext(UserContext);

// //   const removePicture = async (e) => {
// //     try{
// //       const data = await removeProfilePicture();
// //       setUserData(oldData => ({
// //         ...oldData,
// //         'profile_picture': data
// //       }));
// //       setProfile({
// //         type: "CHANGE_PROFILE_PICTURE",
// //         payload: data
// //       })
// //       closeFunc();
// //     } catch(e){
// //       alert(e);
// //     }
// //   };

// //   return (
// //     <Modal title="Change Profile Picture" size="medium" closeFunc={closeFunc}>
// //       <div className={styles.wrapper}>
// //         <div className={styles.row}>
// //           <button onClick={openFileInput} className={`${styles.btn} ${styles.uploadBtn}`}>Upload Photo</button>
// //         </div>
// //         <div className={styles.row}>
// //           <button onClick={removePicture} className={`${styles.btn} ${styles.removeBtn}`}>Remove Current Photo</button>
// //         </div>
// //       </div>
// //     </Modal>
// //   );
// // };

// // export default ChangePictureModal;



import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../../contexts/ProfileContext";
import {
  removeProfilePicture,
  updateProfilePicture,
} from "../../../services/profileServices";

import ProfilePicture from "../../common/profile-picture/ProfilePicture";
import Modal from "../../modal/Modal";

import { baseProfilePicturePath } from "../../../utils/config";
import styles from "./ChangePictureModal.module.css";


const ChangePictureModal = ({
  pictureInputRef,
  pictureSrc,
  setProfile,
  newProfilePicture,

  pictureWidth,
  pictureHeigth,
}) => {
  const { setUserData } = useContext(UserContext);
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (!newProfilePicture) {
      return;
    }

    const changePicture = async () => {
      try {
        const data = await updateProfilePicture(newProfilePicture);
        setUserData((oldData) => ({
          ...oldData,
          profile_picture: data,
        }));
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
      setUserData((oldData) => ({
        ...oldData,
        profile_picture: data,
      }));
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
