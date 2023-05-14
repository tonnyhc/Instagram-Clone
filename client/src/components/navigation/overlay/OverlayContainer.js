import SearchBox from "../search-box/SearchBox";

import styles from "./OverlayContainer.module.css";

const OverlayContainer = ({ 
  containerType,
  innerRef
 }) => {
  return (
    <div className={styles.overlay} ref={innerRef}>
      <div className={styles.overlayContainer}>
        {containerType == "search" ? <SearchBox /> : <h1>Notifications</h1>}
      </div>
    </div>
  );
};

export default OverlayContainer;
