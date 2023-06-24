import { Route, Routes } from "react-router-dom";
import styles from "./ProfileSettings.module.css";
import SettingsNav from "./settings-navigation/SettingsNav";
import EditProfile from "./edit-profile/EditProfile";
import WhatYouSee from "./what-you-see/WhatYouSee";
import WhoCanSeeYourContent from "./who-can-see-your-content/WhoCanSeeYourContent";

const ProfileSettings = () => {
  return (
    <section>
      <h1>Settings</h1>
      <div className={styles.wrapper}>
        <SettingsNav />
        <Routes>
          <Route path="edit" element={<EditProfile />} />
          <Route path="what_you_see" element={<WhatYouSee />} />
          <Route path="who_can_see_your_content" element={<WhoCanSeeYourContent />} />
        </Routes>
      </div>
    </section>
  );
};

export default ProfileSettings;
