import { useRef, useState } from "react";

import useFormState from "../../../hooks/useFormState";

import Modal from "../../modal/Modal";
import CreatePostDetails from "./CreatePostDetails";

import styles from "./CreatePost.module.css";
import CreatePostPhotos from "./CreatePostPhotos";

const CreatePost = ({ closeModal }) => {
  const inputRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useFormState({
    description: "",
    location: "",
    hideLikesCount: false,
    turnOffComments: false,
  });

  const openInput = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleInputFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <Modal size="big" closeFunc={closeModal} title={"Create new post"}>
      <form encType="multipart/form-data" method="POST">
        <input
          data-testid='file-input'
          onChange={handleInputFileChange}
          type="file"
          hidden
          multiple
          ref={inputRef}
        />
        <button hidden ref={submitBtnRef}></button>
      </form>
      {files.length > 0 ? (
        // Checking if the there are files, to display the pictures
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <CreatePostPhotos files={files} />
            <CreatePostDetails formData={formData} setFormData={setFormData} />
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.photoUpload}>
            <p className={styles.mediaIcons}>
              <i className="fa-solid fa-photo-film"></i>
            </p>
            <p className={styles.title}>Drag photos and videos here</p>
            <button className={styles.submitBtn} onClick={openInput}>
              Select from computer
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreatePost;
