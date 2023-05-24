import { useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthDataContext } from "../../../contexts/AuthContext";
import OverlayContainer from "../overlay/OverlayContainer";

import styles from "./SideNav.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import CreatePost from "../create-post/CreatePost";
import { UserContext } from "../../../contexts/ProfileContext";

const SideNav = () => {
  const { authUserData } = useContext(AuthDataContext);
  const { userData } = useContext(UserContext);
  const [activeNavItem, setActiveNavItem] = useState({
    navLink: "home",
    popUp: null,
  });

  const [postModal, setPostModal] = useState(false);

  const [moreNavItem, setMoreNavItem] = useState(false);
  const moreNavItemRef = useRef(null);
  const moreTabRef = useRef(null);

  const sideNavRef = useRef(null);
  const overlayContainerRef = useRef(null);

  useClickOutside([moreNavItemRef, moreTabRef], () => {
    setMoreNavItem(false);
  });
  useClickOutside([overlayContainerRef, sideNavRef], () => {
    setActiveNavItem((oldItems) => ({
      ...oldItems,
      popUp: null,
    }));
  });

  const handleNavItemClick = (type, value) => {
    if (type == "navLink") {
      setActiveNavItem({
        navLink: value,
        popUp: null,
      });
    } else {
      setActiveNavItem((oldItems) => ({
        ...oldItems,
        [type]: oldItems.popUp == value ? null : value,
      }));
    }
  };

  const closeModal = (e) => {
    setPostModal(false);
  };

  return (
    <aside
      ref={sideNavRef}
      data-testid="sideNavAside"
      className={activeNavItem.popUp ? styles.smallNav : undefined}
    >
      {activeNavItem.popUp && (
        <OverlayContainer
          innerRef={overlayContainerRef}
          containerType={activeNavItem.popUp}
        />
      )}
      {postModal && <CreatePost closeModal={closeModal} />}
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
                    <i className="fa-solid fa-house"></i>
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
                  <i className="fa-solid fa-magnifying-glass"></i>
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
                <NavLink to="/direct/inbox">
                  <span className={styles.navIcon}>
                    <i className="fa-regular fa-paper-plane"></i>
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
                  <i className="fa-regular fa-heart"></i>
                </span>
                <span className={styles.navText}>Notifications</span>
              </li>

              <li
                className={`${styles.navItem}`}
                onClick={(e) => setPostModal(true)}
              >
                <span className={styles.navIcon}>
                  <i className="fa-regular fa-square-plus"></i>
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
                <NavLink to={`/p/${userData.username}`}>
                  <span
                    className={`${styles.navIcon} ${styles.profileNavIcon}`}
                  >
                    <img
                      src={userData.profile_picture}
                      alt="Profile picture"
                    />
                  </span>
                  <span className={styles.navText}>
                    {userData.username}
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.lowerNav}>
          {moreNavItem && (
            <div className={styles.moreTab} ref={moreTabRef}>
              <ul role="list">
                <li>
                  <NavLink to="/settings">
                    <span className={styles.icon}>
                      <i className="fa-solid fa-gear"></i>
                    </span>
                    <span>Settings</span>
                    <span className={styles.rightChevron}>
                      <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/saved">
                    <span className={styles.icon}>
                      <i className="fa-regular fa-bookmark"></i>
                    </span>
                    <span>Saved</span>
                    <span className={styles.rightChevron}>
                      <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/logout">
                    <span>Logout</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <div
            className={`${styles.navItem}`}
            ref={moreNavItemRef}
            onClick={() => setMoreNavItem(!moreNavItem)}
          >
            <span className={styles.navIcon}>
              <i className="fa-solid fa-bars"></i>
            </span>
            <span className={styles.navText}>More</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
