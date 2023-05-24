import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import ProfileDetails from "./ProfileDetails";
import { fetchProfileDetails } from "../../services/profileServices";
import profileReducer from "./profileReducer";

const Profile = () => {
  const { username } = useParams();
  const initialProfile = {
    followers: [],
    followings: [],
    profile_picture: "",
    friendship_status: {
      followed_by_viewer: false,
    },
  };
  const [profile, setProfile] = useReducer(profileReducer, initialProfile);
  useEffect(() => {
    const requestProfile = async (username) => {
      try {
        const data = await fetchProfileDetails(username);
        setProfile({
          type: "FETCH_PROFILE",
          payload: data
        });
      } catch (e) {
        alert(e);
      }
    };
    requestProfile(username);
  }, [username]);

  return (
    <section className={styles.profileSection}>
      <div className={styles.innerWrapper}>
        <ProfileDetails
          profileData={profile}
          friendship_status={profile.friendship_status}
          setProfile={setProfile}
        />
      </div>
    </section>
  );
};

export default Profile;
