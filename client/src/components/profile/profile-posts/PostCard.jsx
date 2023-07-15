import { NavLink } from "react-router-dom";
import styles from "./PostCard.module.css";

const PostCard = ({ post }) => {
  return (
    <article className={styles.card}>
      <NavLink to="/post/2314551235">
        <img
          className={styles.cardImg}
          src={post.media_files[0]}
          alt="Post photo"
        />
      </NavLink>

      {/* Display this only if the image has more than 1 pictures */}
      {post.media_files.length > 1 && (
        <div className={styles.multipleImg}>
          <i class="fa-solid fa-layer-group"></i>
        </div>
      )}

      {/* Change the count of the likes and the comments */}
      <div className={styles.hoverInfo}>
        <div className={styles.hoverIcon}>
          <i className="fa-solid fa-heart"></i>
          <span>101</span>
        </div>
        <div className={styles.hoverIcon}>
          <i className="fa-solid fa-comment"></i>
          <span>2</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
