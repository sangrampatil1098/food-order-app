import React, { useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const removeItemHandler = (id) => {
    cartCtx.removeFromCartHandler(id);
  };

  const addItemHandler = (item) => {
    cartCtx.addToCartHandler({ ...item, amount: 1 });
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const totalAmount = +cartCtx.totalAmount.toFixed(2);

  const submitHandler = async (userData) => {
    setIsSending(true);
    await fetch(
      "https://http-post-request-93818-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          cartItems: cartCtx.items,
        }),
      }
    );
    setIsSending(false);
    setDidSubmit(true);
    cartCtx.clearCartHandler();
  };

  const modalContent = (
    <>
      {cartItem}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitHandler} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          <button className={classes.button} onClick={handleCheckout}>
            Order
          </button>
        </div>
      )}
    </>
  );

  const submittedContent = (
    <>
      <p>your order is submitted successfully. Thank you.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSending && !didSubmit && modalContent}
      {isSending && !didSubmit && <p>your order is being submitted.</p>}
      {didSubmit && !isSending && submittedContent}
    </Modal>
  );
};

export default Cart;
