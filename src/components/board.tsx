import styles from '../styles/Board.module.scss';
import Card from './card';
import { BoardColumn } from '../types';
import { FaStar, FaLock, FaShareAlt, FaFilter, FaBolt } from 'react-icons/fa'; // Thêm các biểu tượng

const columns: BoardColumn[] = [
  {
    title: 'Info',
    cards: [{ id: 1, title: 'How to use this board', description: '', type: 'fyi', count: 1 }],
  },
  {
    title: "Team Member's Topics",
    cards: [
      { id: 2, title: 'The team is stuck on X. How can we move forward?', description: '', type: 'blocker', count: 4 },
      { id: 3, title: 'I’ve drafted my goals for the next few months. Any feedback?', description: '', type: 'discussion', count: 3 },
      { id: 4, title: 'I think we can improve velocity if we make some tooling changes.', description: '', type: 'discussion', count: 3 },
    ],
  },
  {
    title: "Manager's Topics",
    cards: [
      { id: 5, title: 'New training program', description: '', type: 'fyi', count: 1 },
      { id: 6, title: 'Can you please give feedback on the report?', description: '', type: 'discussion', count: 3 },
    ],
  },
  {
    title: 'Goals',
    cards: [
      { id: 7, title: 'Manage time chaos', description: '', type: 'goal', count: 1 },
      { id: 8, title: 'Mentor another developer', description: '', type: 'goal', count: 1 },
      { id: 9, title: 'Best practice blog', description: '', type: 'goal', count: 1 },
    ],
  },
];

const Board = () => {
  return (
    <div className={styles.board}>
      {/* Thanh sub-header cho Board */}
      <div className={styles.subHeader}>
        <div className={styles.leftSection}>
          {/* Logo Trello */}
          <div className={styles.logo}>Trello</div>

          {/* Biểu tượng ngôi sao */}
          <button className={styles.iconButton}>
            <FaStar />
          </button>

          {/* Biểu tượng khóa */}
          <button className={styles.iconButton}>
            <FaLock />
          </button>

          {/* Tên bảng với dropdown */}
          <div className={styles.boardTitle}>
            <span>Bảng</span>
            <span className={styles.dropdownArrow}>▼</span>
          </div>
        </div>

        <div className={styles.rightSection}>
          {/* Các nút chức năng */}
          <button className={styles.actionButton}>
            <FaBolt /> Tiến ích bổ sung
          </button>
          <button className={styles.actionButton}>
            <FaBolt /> Tự động hóa
          </button>
          <button className={styles.actionButton}>
            <FaFilter /> Bộ lọc
          </button>
          <button className={styles.shareButton}>
            <FaShareAlt /> Chia sẻ <span className={styles.shareCount}>2</span>
          </button>
        </div>
      </div>

      {/* Phần các cột */}
      <div className={styles.columns}>
        {columns.map((column) => (
          <div key={column.title} className={styles.column}>
            <h3>{column.title}</h3>
            {column.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
            <button className={styles.addButton}>+ Thêm thẻ</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;