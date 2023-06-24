import { NavLink } from "react-router-dom";

import Slider from "../../../common/slider/Slider";

import styles from "../ProfileSettings.module.css";

const WhoCanSeeYourContent = () => {
  return (
    <article className={styles.settingsArticle}>
      <div className={styles.mainPart}>
        <h2 className={styles.title}>Who can see your content</h2>
        <div className={styles.settingsContentWrapper}>
          <div className={styles.settingsRowWrapper}>
            <h4 className={styles.rowTitle}>Account privacy</h4>
            <div className={styles.innerRow}>
              <p>Private account</p>
              <Slider />
            </div>
            <div className={styles.rowHelperText}>
              When your account is public, your profile and posts can be seen by
              anyone, on or off Instagram, even if they don't have an Instagram
              account. When your account is private, only the followers you
              approve can see what you share, including your photos or videos on
              hashtag and location pages, and your followers and following
              lists. Learn more
            </div>
          </div>

          <div className={styles.settingsRowWrapper}>
            <h4 className={styles.rowTitle}>Blocked accounts </h4>
            <div className={styles.innerRow}>
              <NavLink className={styles.link} to="/">
                See and manage accounts you've blocked
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WhoCanSeeYourContent;
