import { useState } from "react";

import styles from "./CreatePostPhotos.module.css";

const CreatePostPhotos = ({ files, setFiles }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(() => {
    const url = URL.createObjectURL(files[0]);
    const index = 0;

    return { url, index };
  });

  const changeCurrentPicture = (e, step) => {
    const index = selectedPhoto.index;

    if (step == "previous" && index > 0) {
      const photo = files[index - 1];
      setSelectedPhoto({
        url: URL.createObjectURL(photo),
        index: index - 1,
      });
    } else if (step == "next" && index < files.length - 1) {
      const photo = files[index + 1];
      setSelectedPhoto({
        url: URL.createObjectURL(photo),
        index: index + 1,
      });
    }
  };

  return (
    <div className={styles.photos}>
      <div className={styles.photoWrapper}>
        <img src={selectedPhoto.url} alt="Picutre" />
      </div>

      <div className={styles.photoDotsCount}>
        {files.map((file, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              selectedPhoto.index == index ? styles.active : undefined
            }`}
          >
            <i className="fa-solid fa-circle"></i>
          </span>
        ))}
      </div>
      {files.length > 1 && (
        // Checking if there are more than 1 pictures, to display the arrows to preview the pictures
        <>
          {selectedPhoto.index >= 1 && (
            <div className={styles.leftArrow}>
              <button onClick={(e) => changeCurrentPicture(e, "previous")}>
                <div className={styles.arrowWrapper}>
                  <span className={styles.arrow}>
                    <i className="fa-solid fa-chevron-left"></i>
                  </span>
                </div>
              </button>
            </div>
          )}
          {selectedPhoto.index < files.length - 1 && (
            <div className={styles.rightArrow}>
              <button onClick={(e) => changeCurrentPicture(e, "next")}>
                <div className={styles.arrowWrapper}>
                  <span className={styles.arrow}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreatePostPhotos;
