import React, { useState } from 'react';
import styles from '../styles/addColumnForm.module.scss';

type Props = {
  onAdd: (title: string) => void;
  onCancel: () => void;
  loading?: boolean
};

const AddColumnForm: React.FC<Props> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  return (
    <div className={styles.form}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter column title..."
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

export default AddColumnForm;