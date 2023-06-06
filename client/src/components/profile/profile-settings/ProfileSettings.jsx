import { Route, Routes } from "react-router-dom";
import styles from "./ProfileSettings.module.css";
import SettingsNav from "./settings-navigation/SettingsNav";
import EditProfile from "./edit-profile/EditProfile";

const ProfileSettings = () => {
  return (
    <section>
      <h1>Settings</h1>
      <div className={styles.wrapper}>
        <SettingsNav />
        <Routes>
          <Route path="edit" element={<EditProfile />} />
        </Routes>
      </div>
    </section>
  );
};

export default ProfileSettings;
