import React, { useState } from "react";
import styles from "./item.module.css";

interface ItemProps {
  item: string;
  onDelete: () => void;
  amount: number;
}

const Item: React.FC<ItemProps> = ({ item, onDelete, amount }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleTickClick = () => {
    setIsDeleted(!isDeleted);
  };

  return (
    <li className={`${styles.list} ${isDeleted ? styles.deleted : ""}`}>
      <div>
        <span>{item}</span>
        <span>{amount}</span>
        <button onClick={onDelete}>X</button>
        <button onClick={handleTickClick}>✓</button>
      </div>
    </li>
  );
};

export default Item;
