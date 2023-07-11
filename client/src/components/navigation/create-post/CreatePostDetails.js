import { useState, useRef } from "react";

import styles from "./CreatePostDetails.module.css";
import Slider from "../../common/slider/Slider";

const CreatePostDetails = ({ formData, setFormData }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const hideLikesInputRef = useRef(null);
  const turnOffCommentsRef = useRef(null);
  const onClickSlider = (ref) => {
    ref.current.click();

  };

  return (
    <div className={styles.postDetails}>
      <div className={styles.author}>
        <img
          className={styles.authorProfilePic}
          src={process.env.PUBLIC_URL + "/images/base-profile-pic.png"}
          alt=""
        />
        <p className={styles.authorUsername}>https.tonny_</p>
      </div>
      <div className={styles.description}>
        <textarea
          maxLength={500}
          name="caption"
          id="caption"
          cols="30"
          rows="10"
          placeholder="Write a caption..."
          value={formData.description}
          onChange={setFormData}
        ></textarea>
        <div className={styles.charsCount}>
          {formData.caption.length}/500
        </div>
      </div>
      <div className={styles.location}>
        <input
          maxLength="100"
          type="text"
          value={formData.location}
          name="location"
          placeholder="Add location"
          onChange={setFormData}
        />
        <span className={styles.locationIcon}>
          <i class="fa-solid fa-location-dot"></i>
        </span>
      </div>
      <div className={styles.settings}>
        <div
          className={styles.title}
          onClick={() => setOpenSettings(!openSettings)}
        >
          <p style={openSettings ? { fontWeight: "bold" } : undefined}>
            Advanced settings
          </p>
          <span>
            {openSettings ? (
              <i class="fa-solid fa-chevron-up"></i>
            ) : (
              <i class="fa-solid fa-chevron-down"></i>
            )}
          </span>
        </div>
        {openSettings && (
          <div className={styles.settingsList}>
            <div className={styles.option}>
              <div className={styles.optionTitle}>
                <p>Hide like and view counts on this post</p>
                <input
                  onChange={(e) => setFormData(e)}
                  name="hidden_likes"
                  ref={hideLikesInputRef}
                  type="checkbox"
                  hidden
                  checked={formData.hidden_likes}
                />
                <Slider
                  onClickFunc={(e) => onClickSlider(hideLikesInputRef)}
                  checked={formData.hidden_likes}
                />
              </div>
              <span className={styles.optionInfo}>
                Only you will see the total number of likes and views on this
                post. You can change this later by going to the ··· menu at the
                top of the post. To hide like counts on other people's posts, go
                to your account settings.
              </span>
            </div>

            <div className={styles.option}>
              <div className={styles.optionTitle}>
                <p>Turn off commenting</p>
                <input
                  onChange={(e) => setFormData(e)}
                  name="disabled_comments"
                  ref={turnOffCommentsRef}
                  type="checkbox"
                  hidden
                  checked={formData.disabled_comments}
                />
                <Slider
                  onClickFunc={(e) => onClickSlider(turnOffCommentsRef)}
                  checked={formData.disabled_comments}
                />
              </div>
              <span className={styles.optionInfo}>
                You can change this later by going to the ··· menu at the top of
                your post.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostDetails;
