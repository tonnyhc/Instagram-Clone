import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./ProfileDetails.module.css";
import ChangePictureModal from "./change-profile-picture-modal/ChangePictureModal";
import {
  followProfile,
  updateProfilePicture,
} from "../../services/profileServices";
import { AuthDataContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/ProfileContext";
import FollowersModal from "./followers-modal/FollowersModal";
import { baseProfilePicturePath } from "../../utils/config";
import ProfilePicture from "../common/profile-picture/ProfilePicture";

const ProfileDetails = ({ profileData, friendship_status, setProfile }) => {
  const [followersModal, setFollowersModal] = useState({
    title: "",
    state: false,
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [changePictureModal, setChangePictureModal] = useState(false);
  const pictureInputRef = useRef(null);
  const { userData, setUserData } = useContext(UserContext);
  const { authUserData } = useContext(AuthDataContext);
  const isProfileOwner = profileData.is_profile_owner;

  const closeModal = () => {
    setChangePictureModal(false);
  };

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
        closeModal();
      } catch (e) {
        alert(e);
      }
    };
    changePicture();
  }, [newProfilePicture]);

  const onFollow = async (e) => {
    e.preventDefault();
    const { profileToFollowId } = Object.fromEntries(new FormData(e.target));
    const data = await followProfile(profileToFollowId);
    setProfile({
      type: "FOLLOW-UNFOLLOW_USER",
      payload: {
        id: userData.profile_id,
        data: data.type == "cors" ? null : data,
      },
    });
  };

  return (
    <>
      {changePictureModal && (
        <ChangePictureModal
          openFileInput={() => pictureInputRef.current.click()}
          closeFunc={closeModal}
          setProfile={setProfile}
        />
      )}

      {isProfileOwner && (
        <form method="POST" role="presentation" encType="multipart/form-data">
          <input
            onChange={(e) => setNewProfilePicture(e.target.files[0])}
            value={""}
            accept="image/jpeg,image/png"
            type="file"
            hidden
            ref={pictureInputRef}
          />
        </form>
      )}

      {followersModal.state && (
        <FollowersModal
          onFollow={onFollow}
          title={followersModal.title}
          size="small"
          profileId = {profileData.id}
          closeFunc={() => setFollowersModal((followersModal.state = false))}
        ></FollowersModal>
      )}

      <div className={styles.detailsWrapper}>
        {isProfileOwner ? (
          <div className={styles.profilePicture}>
            {profileData.profile_picture ? (
              <button
                onClick={() => setChangePictureModal(!changePictureModal)}
                className={styles.changePicBtn}
                title="Change profile picture"
              >
                {/* <img
                  src={`${profileData.profile_picture}`}
                  alt="User profile picture"
                /> */}
                <ProfilePicture width='150px' height='150px' src={profileData.profile_picture} alt="User profile picture"/>
              </button>
            ) : (
              <button
                className={styles.changePicBtn}
                onClick={(e) => pictureInputRef.current.click()}
                title="Add a profile photo"
              >
                {/* <img src={baseProfilePicturePath} alt="Add profile picture" /> */}
                <ProfilePicture width="150px" height="150px" src={baseProfilePicturePath} alt="Add profile picture"/>
              </button>
            )}
          </div>
        ) : (
          <div className={styles.profilePicture}>
            <img
              src={`${profileData.profile_picture}`}
              alt="User profile picture"
            />
          </div>
        )}
        <div className={styles.profileDetails}>
          <div className={`${styles.row} ${styles.usernameWrapper}`}>
            <h2 className={styles.username}>{profileData.username}</h2>
            {isProfileOwner && (
              <div className={styles.detailsButtons}>
                <div className={styles.linkBtn}>
                  <NavLink to="/accounts/edit/">Edit profile</NavLink>
                </div>
                <button className={styles.settingsPopUp}>
                  <span>
                    <i className="fa-solid fa-gear"></i>
                  </span>
                </button>
              </div>
            )}
            {!isProfileOwner && (
              <div className={styles.detailsButtons}>
                <div
                  className={
                    friendship_status.followed_by_viewer
                      ? `${styles.unfollowBtn} ${styles.secondaryBtn}`
                      : `${styles.followBtn} ${styles.primaryBtn}`
                  }
                >
                  <form onSubmit={onFollow}>
                    <input
                      type="hidden"
                      name="profileToFollowId"
                      value={profileData.id}
                    />
                    <button>
                      {friendship_status.followed_by_viewer
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </form>
                </div>
                {friendship_status.followed_by_viewer && (
                  <div className={`${styles.messageBtn} ${styles.linkBtn}`}>
                    <NavLink className={styles.button} to={`/direct/t/123`}>
                      Message
                    </NavLink>
                  </div>
                )}

                <button className={styles.actionDots}>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            )}
          </div>
          <div className={`${styles.row} ${styles.followersWrapper}`}>
            <p>
              <b>2</b> posts
            </p>
            <p>
              <button
                className={
                  profileData.followers_count == 0
                    ? styles.disabledBtn
                    : undefined
                }
                onClick={() =>
                  setFollowersModal({ title: "Followers", state: true })
                }
              >
                <b>{profileData.followers_count}</b> followers
              </button>
            </p>
            <button
              className={
                profileData.followings_count == 0
                  ? styles.disabledBtn
                  : undefined
              }
              onClick={() =>
                setFollowersModal({ title: "Followings", state: true })
              }
            >
              <span>
                <b>{profileData.followings_count}</b> following
              </span>
            </button>
          </div>
          <div className={`${styles.row} ${styles.bioWrapper}`}>
            <p className={styles.fullName}>{profileData.full_name}</p>
            <p className={styles.profileType}>Athlete</p>
            <p className={styles.bio}>{profileData.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;


