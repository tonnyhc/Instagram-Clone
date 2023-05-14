import styles from "./Slider.module.css";

const Slider = ({ checked, onClickFunc }) => {
  return (
    <div onClick={onClickFunc} className={`${styles.sliderBox} ${checked ? styles.checked : undefined}`}>
      <div
        className={`${styles.slider} ${checked ? styles.checked : undefined}`}
      ></div>
    </div>
  );
};

export default Slider;
