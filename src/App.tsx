import styles from './styles/App.module.scss';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Board from './components/board';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;