import styles from './Button.module.css';

const Button = ({
    type,
    text
}) => {
    return (
        <button className={styles[type]}>{text}</button>
    );
};

export default Button;