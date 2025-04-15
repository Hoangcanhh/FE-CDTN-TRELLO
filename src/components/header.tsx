import styles from '../styles/Header.module.scss';
import { FaBars, FaSearch, FaBell } from 'react-icons/fa'; // Sử dụng react-icons/fa cho các biểu tượng

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Biểu tượng menu */}
        <button className={styles.menuButton}>
          <FaBars />
        </button>

        {/* Logo Trello */}
        <div className={styles.logo}>Trello</div>

        {/* Các mục điều hướng */}
        <div className={styles.navItems}>
          <div className={styles.navItem}>
            Các Không gian làm việc <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.navItem}>
            Gần đây <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.navItem}>
            Đã đánh Dấu sao <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.navItem}>
            Mẫu <span className={styles.dropdownArrow}>▼</span>
          </div>
          <button className={styles.createButton}>Tạo mới</button>
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Thanh tìm kiếm */}
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        {/* Biểu tượng thông báo */}
        <button className={styles.iconButton}>
          <FaBell />
        </button>

        {/* Avatar */}
        <div className={styles.avatar}>HC</div>
      </div>
    </header>
  );
};

export default Header;