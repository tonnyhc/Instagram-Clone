import styles from './Button.module.css';

const Button = ({
    type,
    text,
    onClick
}) => {
    return (
        <button onClick={onClick} className={styles[type]}>{text}</button>
    );
};

export default Button;