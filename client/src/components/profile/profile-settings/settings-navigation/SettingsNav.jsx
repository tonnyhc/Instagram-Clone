import {NavLink} from 'react-router-dom';

import styles from './SettingsNav.module.css';

const SettingsNav = () => {
    return (
        <ul role='list' className={styles.nav}>
            <li className={styles.navLink}>
                <NavLink to='/accounts/edit' className={({isActive}) => isActive ? styles.active : undefined}>
                    <p className={styles.navLinkText}>Edit profile</p>
                </NavLink>
            </li>

            <li className={styles.navLink}>
                <NavLink to='/accounts/what_you_see' className={({isActive}) => isActive ? styles.active : undefined}>
                    <p className={styles.navLinkText}>What you see</p>
                </NavLink>
            </li>

            <li className={styles.navLink}>
                <NavLink to='/accounts/who_can_see_your_content' className={({isActive}) => isActive ? styles.active : undefined}>
                    <p className={styles.navLinkText}>Who can see your content</p>
                </NavLink>
            </li>
            
        </ul>
    );
};

export default SettingsNav