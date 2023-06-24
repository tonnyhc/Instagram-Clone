import Slider from '../../../common/slider/Slider'


import styles from '../ProfileSettings.module.css'


const WhatYouSee = () => {
    return (
        <article className={styles.settingsArticle}>
            <div className={styles.mainPart}>
                <h2 className={styles.title}>What you see</h2>
                <div className={styles.settingsContentWrapper}>
                    <div className={styles.settingsRowWrapper}>
                        <h4 className={styles.rowTitle}>Likes and views</h4>
                        <div className={styles.innerRow}>
                            <p>Hide likes</p>
                            <Slider />
                        </div>
                        <div className={styles.rowHelperText}>The number of likes on posts from other accounts will be hidden. You can hide the number of likes on your own posts by going to Advanced Settings before sharing. Learn more</div>
                    </div>
                </div>
            </div>
        </article>
    );
};


export default WhatYouSee