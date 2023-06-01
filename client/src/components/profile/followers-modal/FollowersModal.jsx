import { useContext, useEffect, useState } from "react";
import Modal from "../../modal/Modal";

import styles from "./FollowersModal.module.css";
import {
  getProfileFollowers,
  getProfileFollowings,
} from "../../../services/profileServices";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/ProfileContext";

const FollowersModal = ({ closeFunc, title, onFollow, profileId }) => {
  const [profiles, setProfiles] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const fetchFn =
        title == "Followers" ? getProfileFollowers : getProfileFollowings;
      try {
        const data = await fetchFn(profileId);
        setProfiles(data);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  return (
    <Modal title={title} size="medium" closeFunc={closeFunc}>
      <div className={styles.wrapper}>
        <ul role="list">
          {profiles.map((x) => (
            <li key={x.profile_id} className={styles.card}>
              <div className={styles.profile}>
                <div className={styles.profilePicture}>
                  <NavLink to={`/p/${x.username}`}>
                    <img
                      src={
                        x.profile_picture
                          ? x.profile_picture
                          : process.env.PUBLIC_URL +
                            "/images/base-profile-pic.png"
                      }
                      alt="Profile picture"
                    />
                  </NavLink>
                </div>
                <div className={styles.profileDetails}>
                  <p>
                    <NavLink to={`/p/${x.username}`}>
                      <b>{x.username}</b>
                    </NavLink>
                  </p>
                  <p className={styles.fullName}>{x.full_name}</p>
                </div>
              </div>
              <div className={styles.actionBtn}>
                <div className={styles.btnWrapper}>
                  {/* This checks if the the the x(follower) is the logged in user, to remove the follow */}
                  {x.profile_id !== userData.profile_id && (
                    <form onSubmit={onFollow}>
                      <button
                        className={
                          x.is_followed_by_viewer
                            ? styles.btnSecondary
                            : styles.btnPrimary
                        }
                      >
                        {x.is_followed_by_viewer ? "Unfollow" : "Follow"}
                      </button>
                      <input
                        type="hidden"
                        name="profileToFollowId"
                        value={x.profile_id}
                      />
                    </form>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default FollowersModal;
