import styles from '../styles/Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Trello Không gian làm việc</h2>
      <ul>
        <li>Các cái đặt Không gian làm việc</li>
        <li>Bảng</li>
        <li>Thành viên</li>
        <li>Các cài đặt không gian làm việc</li>
      </ul>
      <div className={styles.boardSection}>
        <h3>Jira</h3>
        <ul>
          <li>Các dự án đã liên kết</li>
          <li>Mời tham gia Jira</li>
        </ul>
        <h3>Dạng xem Không gian làm việc</h3>
        <ul>
          <li>Bảng</li>
          <li>Lịch</li>
        </ul>
        <h3>Các bảng của bạn</h3>
        <ul>
          <li>trello</li>
        </ul>
      </div>
      <div className={styles.currentTasks}>
        <h3>Hiện thị nhiều hơn</h3>
      </div>
    </div>
  );
};

export default Sidebar;