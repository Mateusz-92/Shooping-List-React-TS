import React, { useState, useEffect } from "react";
import SearchBar from "../search_form/searchBarForm";
import ItemList from "../shopping_list_item/itemList";
import styles from "./shoppingList.module.css";
import SearchBarList from "../search_form/searchBarList";

interface SelectedItem {
  item: string;
  amount: number;
}

const SearchForm: React.FC = () => {
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  let timeoutId: NodeJS.Timeout | null = null;

  const searchEndpoint = async (inputText: string) => {
    if (inputText.length > 2) {
      try {
        const response = await fetch(
          `https://api.frontendeval.com/fake/food/${inputText}`
        );
        const result = await response.json();
        setSearchResult(result);
      } catch (error) {
        console.log("Error fetching search results:", error);
        setSearchResult([]);
      }
    } else {
      setSearchResult([]);
    }
  };

  const debounce = (callback: (...args: any[]) => void, delay: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, delay);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
  };

  const handleAddItemToList = (item: string, amount: number) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.item === item
    );
    if (existingItemIndex !== -1) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[existingItemIndex].amount += amount;
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems((prevItems) => [...prevItems, { item, amount }]);
    }
  };

  const handleDeleteItem = (item: string) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.item !== item
    );
    setSelectedItems(updatedSelectedItems);
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      debounce(() => {
        searchEndpoint(searchTerm);
      }, 500);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  const searchResults = searchResult.map((result) => (
    <SearchBarList
      result={result}
      key={result}
      onAddHandler={handleAddItemToList}
    />
  ));

  return (
    <div>
      <div className={styles.search_list_wrapper}>
        <SearchBar value={searchTerm} onChange={handleInputChange} />
        <ul className={styles.ul}>{searchResults}</ul>
      </div>

      {selectedItems.length > 0 && (
        <div>
          <span className={styles.span}>Products to buy :</span>
          <ItemList
            items={selectedItems.map((selectedItem) => ({
              item: selectedItem.item,
              amount: selectedItem.amount,
            }))}
            onItemDelete={(index) => {
              handleDeleteItem(selectedItems[index].item);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchForm;
