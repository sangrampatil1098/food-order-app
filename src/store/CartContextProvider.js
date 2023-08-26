import React, { useReducer } from "react";
import { CartContext } from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      let existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;
      if (existingCartItem) {
        let updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      let existingCartItemIndex1 = state.items.findIndex(
        (item) => item.id === action.payload
      );
      console.log("existingCartItemIndex1", existingCartItemIndex1);
      let existingCartItem1 = state.items[existingCartItemIndex1];
      let updatedTotalAmount1 = state.totalAmount - existingCartItem1.price;
      let updatedItems1;
      if (existingCartItem1.amount === 1) {
        updatedItems1 = state.items.filter((item) => item.id != action.payload);
      } else {
        let updatedItem1 = {
          ...existingCartItem1,
          amount: existingCartItem1.amount - 1,
        };
        updatedItems1 = [...state.items];
        updatedItems1[existingCartItemIndex1] = updatedItem1;
      }
      return {
        items: updatedItems1,
        totalAmount: updatedTotalAmount1,
      };
    case "CLEAR":
      return defaultState;
  }
  return defaultState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatch] = useReducer(reducer, defaultState);
  console.log("cartState", cartState);

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
  };
  const removeFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCartHandler: addToCartHandler,
    removeFromCartHandler: removeFromCartHandler,
    clearCartHandler: clearCartHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
