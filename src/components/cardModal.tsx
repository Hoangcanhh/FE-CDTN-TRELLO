import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/cardModal.module.scss';
import type { CardType } from './board';

type Props = {
  card: CardType;
  onClose: () => void;
};

const CardModal: React.FC<Props> = ({ card, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>{card.title}</h2>
        <div>
          <strong>Mô tả:</strong>
          <p>{card.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardModal;