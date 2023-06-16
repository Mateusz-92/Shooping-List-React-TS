import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Item from "./components/shopping_list_item/item";

describe("Item component", () => {
  const onAddMock = jest.fn();
  const onDeleteMock = jest.fn();
  const defaultProps = {
    item: "test item",
    onAdd: onAddMock,
    onDelete: onDeleteMock,
  };
});
