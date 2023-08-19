import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [Fname, setName] = useState("");
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemCategory: "Dairy",
  });

  function onhandleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setNewItem((prevItem) => ({
      ...prevItem,
      [key]: value,
    }));
  }

  function onItemFormSubmit(e) {
    e.preventDefault();
    const formDt = {
      id: uuid(),
      name: newItem.itemName,
      category: newItem.itemCategory,
    };
    const newArray = [...items, formDt];
    setNewItem({ itemName: "", itemCategory: "Dairy" });
    setItems(newArray); // Assuming you have a setItems function for updating items state
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm
        onItemFormSubmit={onItemFormSubmit}
        newItem={newItem}
        onhandleChange={onhandleChange}
      />
      <Filter
        onCategoryChange={handleCategoryChange}
        name={Fname}
        onSetName={handleName}
      />
      <ul className="Items">
        {itemsToDisplay
          .filter((item) => {
            if (!Fname) return true;
            return item.name.toLowerCase().includes(Fname.toLowerCase());
          })
          .map((item) => (
            <Item key={item.id} name={item.name} category={item.category} />
          ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
