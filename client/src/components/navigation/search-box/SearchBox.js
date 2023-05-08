import styles from './SearchBox.module.css';

const SearchBox = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.searchBoxContainer}>
                <div className={styles.searchBox}>
                    <div className={styles.heading}>
                        <p>Search</p>
                    </div>
                    <div className={styles.searchWrapper}>
                        <div className={styles.search}>
                            <input type="text" placeholder="Search" />
                            <span className={styles.searchIcon}><i class="fa-solid fa-magnifying-glass"></i></span>
                        </div>
                    </div>
                </div>
                <div className={styles.recentSearches}>

                </div>
            </div>
        </div>
    );
};


export default SearchBox;