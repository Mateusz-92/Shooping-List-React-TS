import React from "react";
import Item from "./item";

interface Item {
  item: string;
  amount: number;
}

interface ItemListProps {
  items: Item[];
  onItemDelete: (index: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemDelete }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <Item
          key={index}
          item={item.item}
          amount={item.amount}
          onDelete={() => onItemDelete(index)}
        />
      ))}
    </ul>
  );
};

export default ItemList;
