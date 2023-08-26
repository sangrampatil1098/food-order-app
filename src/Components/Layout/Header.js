import React from "react";
import styles from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React-meal</h1>
        <HeaderCartButton onCart={props.onCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={meals} alt="" />
      </div>
    </>
  );
};

export default Header;
