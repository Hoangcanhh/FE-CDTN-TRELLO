import styles from '../styles/card.module.scss';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const Card = ({ card }: CardProps) => {
  const typeStyles = {
    blocker: styles.blocker,
    discussion: styles.discussion,
    fyi: styles.fyi,
    paused: styles.paused,
    goal: styles.goal,
  };

  return (
    <div className={`${styles.card} ${typeStyles[card.type]}`}>
      <h4>{card.title}</h4>
      {card.description && <p>{card.description}</p>}
      <span>{card.count}</span>
    </div>
  );
};

export default Card;