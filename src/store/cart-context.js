import React from "react";
import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addToCartHandler: () => {},
  removeFromCartHandler: () => {},
  clearCartHandler: () => {},
});
