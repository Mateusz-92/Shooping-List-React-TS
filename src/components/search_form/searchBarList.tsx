import styles from "./searchBarList.module.css";
import React, { useState } from "react";

interface SearchBarListProps {
  result: string;
  onAddHandler: (item: string, amount: number) => void;
}

const SearchBarList: React.FC<SearchBarListProps> = (props) => {
  const [amount, setAmount] = useState(1);

  const handlePlusClick = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const handleMinusClick = () => {
    if (amount === 1) return;
    setAmount((prevAmount) => prevAmount - 1);
  };

  const handleAddClick = () => {
    props.onAddHandler(props.result, amount);
  };
  return (
    <div className={styles.search}>
      <li className={styles.li}>
        <div className={styles.list}>
          <div>{props.result}</div>
          {props.result !== null && (
            <div>
              <button onClick={handleMinusClick}>-</button>
              <button onClick={handlePlusClick}>+</button>
              <button onClick={handleAddClick}>Add</button>
              <span> amount: {amount}</span>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default SearchBarList;
