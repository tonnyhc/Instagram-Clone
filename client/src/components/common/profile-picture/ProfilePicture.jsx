import styles from './ProfilePicture.module.css'

const ProfilePicture = ({src, altText, width, height}) => {
    const imgStyle = {
        width,
        height,
    }
  return (
  <div className={styles.imgWrapper} style={imgStyle}>
    <img src={src} alt={altText} className={styles.img} />
  </div>
  );
};

export default ProfilePicture
