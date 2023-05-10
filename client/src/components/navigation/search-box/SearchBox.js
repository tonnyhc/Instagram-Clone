import { useRef, useState } from "react";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div data-testid="searchOverlay" className={styles.searchBoxContainer}>
      <div className={styles.searchBox}>
        <div className={styles.heading}>
          <p>Search</p>
        </div>

        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <div className={styles.searchInputWrapper}>
              {!isSearchFocused && !search && (
                <span className={styles.searchIcon}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              )}
              <input
                name='search'
                value={search}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
              />
            </div>

            {search && (
              <div className={styles.searchIcon}>
                <span
                  className={styles.clearSearch}
                  onClick={(e) => setSearch("")}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.recentSearches}>
        
        <div className={styles.subHeading}>
          <p>Recent</p>
        </div>
        <div className={styles.recentsList}>
          <div className={styles.noRecents}>
            <p>No recent searches.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
