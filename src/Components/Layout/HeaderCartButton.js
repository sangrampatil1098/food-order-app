import React, { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import { CartContext } from "../../store/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnHighlighted, setbtnHighlighted] = useState(false);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((acc, curr) => {
    acc += curr.amount;
    return acc;
  }, 0);

  const btnClasses = `${styles.button} ${btnHighlighted && styles.bump}`;

  useEffect(() => {
    setbtnHighlighted(true);

    const timer = setTimeout(() => {
      setbtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
