import { useEffect, useState } from "react";

import PostCard from "./PostCard";
import styles from "./ProfilePosts.module.css";
import { getProfilePosts } from "../../../services/postServices";
import { useParams } from "react-router-dom";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    (async () => {
      try{
        const data = await getProfilePosts(username);
        setPosts(data);
      } catch(e){
        alert(e);
      }
    })();
  }, []);

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
        {posts.map(post => <PostCard post={post}/>)}
      </div>
    </>
  );
};

export default ProfilePosts;
