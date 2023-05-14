import { useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ children, size, title, footer, closeFunc }) => {
  const overlayContainerRef = useRef(null);
  const modalRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (event.target === overlayContainerRef.current) {
      closeFunc(false);
    }
  };
  return (
    <div
      className={styles.modalOverlay}
      ref={overlayContainerRef}
      onClick={handleOverlayClick}
    >
      <div className={`${styles.modal} ${styles[size]}`} ref={modalRef}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>{title}</p>
          <button onClick={() => closeFunc(false)} className={styles.closeBtn}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>{children}</div>

        {footer && (
          <div className={styles.modalFooter}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Save changes
            </button>
            <button
              className={`${styles.btn} ${styles.closeBtn} ${styles.btnSecondary}`}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
