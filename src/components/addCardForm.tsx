import React, { useState } from 'react';
import styles from '../styles/addCardForm.module.scss';

type Props = {
  onAdd: (title: string) => void;
  onCancel: () => void;
};

const AddCardForm: React.FC<Props> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  return (
    <div className={styles.form}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter card title..."
      />
      {/* <button onClick={() => onAdd(title)} disabled={!title.trim()}>Add</button>
      <button onClick={onCancel}>Cancel</button> */}
      <div className={styles['form-actions']}>
        <button onClick={() => onAdd(title)} disabled={!title.trim()}>Add</button>
        <button type="button" onClick={onCancel}>Cancel</button>
  </div>
    </div>
  );
};

export default AddCardForm;