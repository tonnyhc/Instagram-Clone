import { Link } from "react-router-dom";
import styles from "./SideNav.module.css";

const SideNav = () => {
  return (
    <aside>
      <div className={styles.sideNav}>
        <div className={styles.logoWrapper}>
          <Link to="/">
            <span>
              <img
                src={process.env.PUBLIC_URL + "/images/" + "IG-LOGO-BIG.png"}
                alt="Logo"
              />
            </span>
          </Link>
        </div>

        <div className={styles.navigation}>
          <nav>
            <ul role="list">
              <li className={styles.navItem}>
                <Link to="/">
                  <span className={styles.navIcon}>
                    <i class="fa-solid fa-house"></i>
                  </span>
                  <span>Home</span>
                </Link>
              </li>

              <li className={styles.navItem}>
                <span className={styles.navIcon}>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <span>Search</span>
              </li>

              <li className={styles.navItem}>
                <Link to="/messages">
                  <span className={styles.navIcon}>
                    <i class="fa-regular fa-paper-plane"></i>
                  </span>
                  <span>Messages</span>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link to="/notifications">
                  <span className={styles.navIcon}>
                    <i class="fa-regular fa-heart"></i>
                  </span>
                  <span>Notifications</span>
                </Link>
              </li>

              <li className={styles.navItem}>
                <span className={styles.navIcon}>
                  <i class="fa-regular fa-square-plus"></i>
                </span>
                <span>Create</span>
              </li>

              <li className={styles.navItem}>
                <Link to="/profile">
                  <span className={`${styles.navIcon} ${styles.profileNavIcon}`}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/" +
                        "base-profile-pic.jpg"
                      }
                      alt="Profile picture"
                    />
                  </span>
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.lowerNav}>
          <div className={styles.navItem}>
            <span className={styles.navIcon} >
              <i class="fa-solid fa-bars"></i>
            </span>
            <span>More</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
