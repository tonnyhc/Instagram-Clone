import { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./ProfileDetails.module.css";
import ChangePictureModal from "./change-profile-picture-modal/ChangePictureModal";
import { followProfile } from "../../services/profileServices";
import { UserContext } from "../../contexts/ProfileContext";
import FollowersModal from "./followers-modal/FollowersModal";
import { useSelector } from "react-redux";

const ProfileDetails = ({ profileData, friendship_status, setProfile }) => {
  const [followersModal, setFollowersModal] = useState({
    title: "",
    state: false,
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const pictureInputRef = useRef(null);
  const userData = useSelector((state) => state.userProfile.userData);
  const isProfileOwner = profileData.is_profile_owner;

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
          profileId={profileData.id}
          closeFunc={() => setFollowersModal((followersModal.state = false))}
        ></FollowersModal>
      )}

      <div className={styles.detailsWrapper}>
        {isProfileOwner ? (
          <ChangePictureModal
            pictureHeigth="150px"
            pictureWidth="150px"
            pictureSrc={profileData.profile_picture}
            setProfile={setProfile}
            newProfilePicture={newProfilePicture}
            pictureInputRef={pictureInputRef}
          />
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
