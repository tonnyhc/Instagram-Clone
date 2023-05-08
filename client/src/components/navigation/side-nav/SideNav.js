import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";
import SearchBox from "../search-box/SearchBox";

const SideNav = () => {
  const [activeNavItem, setActiveNavItem] = useState({
    navLink: "home",
    popUp: null,
  });
  
  const [moreNavItem, setMoreNavItem] = useState(false);

  const handleNavItemClick = (type, value) => {
    if (type == "navLink") {
      setActiveNavItem({
        navLink: value,
        popUp: null,
      });
    } else {
      setActiveNavItem((oldItems) => ({
        ...oldItems,
        [type]: value,
      }));
    }
  };

  return (
    <aside className={activeNavItem.popUp ? styles.smallNav : undefined}>
      {activeNavItem.popUp == "search" && <SearchBox />}
      <div className={styles.sideNav}>
        <div className={styles.logoWrapper}>
          <NavLink to="/" onClick={() => handleNavItemClick("navLink", "home")}>
            <span>
              {activeNavItem.popUp ? (
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/" +
                    "ig-logo-small-black.png"
                  }
                  className={styles.navIcon}
                  alt="logo"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/images/" + "IG-LOGO-BIG.png"}
                  alt="Logo"
                />
              )}
            </span>
          </NavLink>
        </div>

        <div className={styles.navigation}>
          <nav>
            <ul role="list">
              <li
                onClick={() => handleNavItemClick("navLink", "home")}
                className={`${styles.navItem} ${
                  activeNavItem.navLink == "home" && activeNavItem.popUp == null
                    ? styles.activeNavItem
                    : undefined
                }`}
              >
                <NavLink to="/">
                  <span className={styles.navIcon}>
                    <i class="fa-solid fa-house"></i>
                  </span>
                  <span className={styles.navText}>Home</span>
                </NavLink>
              </li>

              <li
                onClick={() => handleNavItemClick("popUp", "search")}
                className={`${styles.navItem} ${
                  activeNavItem.popUp == "search"
                    ? styles.activeNavItem
                    : undefined
                }`}
              >
                <span className={styles.navIcon}>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <span className={styles.navText}>Search</span>
              </li>

              <li
                onClick={() => handleNavItemClick("navLink", "messages")}
                className={`${styles.navItem} ${
                  activeNavItem.navLink == "messages" &&
                  activeNavItem.popUp == null
                    ? styles.activeNavItem
                    : undefined
                }`}
              >
                <NavLink to="/messages">
                  <span className={styles.navIcon}>
                    <i class="fa-regular fa-paper-plane"></i>
                  </span>
                  <span className={styles.navText}>Messages</span>
                </NavLink>
              </li>

              <li
                onClick={() => handleNavItemClick("popUp", "notifications")}
                className={`${styles.navItem} ${
                  activeNavItem.popUp == "notifications"
                    ? styles.activeNavItem
                    : undefined
                }`}
              >
                <span className={styles.navIcon}>
                  <i class="fa-regular fa-heart"></i>
                </span>
                <span className={styles.navText}>Notifications</span>
              </li>

              <li className={`${styles.navItem}`}>
                <span className={styles.navIcon}>
                  <i class="fa-regular fa-square-plus"></i>
                </span>
                <span className={styles.navText}>Create</span>
              </li>

              <li
                onClick={() => handleNavItemClick("navLink", "profile")}
                className={`${styles.navItem} ${
                  activeNavItem.navLink == "profile" &&
                  activeNavItem.popUp == null
                    ? styles.activeNavItem
                    : undefined
                }`}
              >
                <NavLink to="/profile">
                  <span
                    className={`${styles.navIcon} ${styles.profileNavIcon}`}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/" +
                        "base-profile-pic.jpg"
                      }
                      alt="Profile picture"
                    />
                  </span>
                  <span className={styles.navText}>Profile</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.lowerNav}>
          {moreNavItem &&
            <div className={styles.moreTab}>
              <ul role='list'>
                <li>
                  <NavLink to='/settings'>
                    <span className={styles.icon}><i class="fa-solid fa-gear"></i></span>
                    <span>Settings</span>
                    <span className={styles.rightChevron}><i class="fa-solid fa-chevron-right"></i></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/saved'>
                    <span className={styles.icon}><i class="fa-regular fa-bookmark"></i></span>
                    <span>Saved</span>
                    <span className={styles.rightChevron}><i class="fa-solid fa-chevron-right"></i></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/logout'>
                    <span>Logout</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          }
          <div className={`${styles.navItem}`} onClick={() => setMoreNavItem(true)}>
            <span className={styles.navIcon}>
              <i class="fa-solid fa-bars"></i>
            </span>
            <span className={styles.navText}>More</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
