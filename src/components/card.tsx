import React, { useState } from 'react';
import type { CardType } from './board';
import styles from '../styles/card.module.scss';

type Props = {
  card: CardType;
  onClick: () => void;
  onRename: (newTitle: string) => void;
};

const Card: React.FC<Props> = ({ card, onClick, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const handleRename = () => {
    onRename(title);
    setEditing(false);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      {editing ? (
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={e => {
            if (e.key === 'Enter') handleRename();
          }}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>{card.title}</span>
      )}
    </div>
  );
};

export default Card;