import PostCard from "./PostCard";
import styles from "./ProfilePosts.module.css";

const ProfilePosts = () => {
  return (
    <>
      <div className={styles.postsWrapper}>
        <ul className={styles.postsNav}>
          <li className={styles.postsNavPill}>
            <div className={styles.pillWrapper}>
              <i className="fa-solid fa-table-cells"></i>
              <span className={styles.navPillText}>Posts</span>
            </div>
          </li>
          <li className={styles.postsNavPill}>
            <div className={styles.pillWrapper}>
              <i className="fa-regular fa-bookmark"></i>
              <span className={styles.navPillText}>Saved</span>
            </div>
          </li>
          <li className={styles.postsNavPill}>
            <div className={styles.pillWrapper}>
              <i className="fa-solid fa-user-tag"></i>
              <span className={styles.navPillText}>Tagged</span>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.posts}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </>
  );
};

export default ProfilePosts;
