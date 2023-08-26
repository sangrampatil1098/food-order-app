import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import { CartContext } from "../../../store/cart-context";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  let price = `$${props.price.toFixed(2)}`;

  const addItem = (amount) => {
    cartCtx.addToCartHandler({
      name: props.name,
      id: props.id,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.descition}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm id={props.id} addItem={addItem} />
    </li>
  );
};

export default MealItem;
