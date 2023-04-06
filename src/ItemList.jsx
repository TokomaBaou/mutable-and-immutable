import React, { useState, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
  border-radius: 5px;
`;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [array, setArray] = useState([1]);

  // Immutable
  const handleAddItemImmutable = () => {
    const newItem = { id: Date.now(), text: "Immutable item" };
    setItems([...items, newItem]);
  };

  // Mutable
  const handleAddItemMutable = () => {
    //予期せぬバグやパフォーマンス上の問題を引き起こす可能性
    const newItem = { id: Date.now(), text: "Mutable item" };
    items.push(newItem);
    setItems([newItem]);
  };

  const handleRemoveItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      const newArray = prevArray;
      newArray.push(1);
      // const newArray = [...prevArray, 1];
      console.log(newArray);
      return newArray;
    });
  }, []);

  return (
    <Container>
      <div>
        <h1>{array}</h1>
        <Button onClick={handleAdd}>+</Button>
      </div>
      <Title>Item List</Title>
      <div>
        <Button onClick={handleAddItemImmutable}>Add imutsable item</Button>
        <Button onClick={handleAddItemMutable}>Add mutable item</Button>
      </div>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            {item.text}{" "}
            <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ItemList;
