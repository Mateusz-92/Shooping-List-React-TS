import React from "react";
import styles from "./searchBarForm.module.css";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search for an product"
    />
  );
};

export default SearchBar;
