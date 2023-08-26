import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useState } from "react";
import { useRef } from "react";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [invalidInput, setInvalidInput] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmountNumber < 0 ||
      enteredAmountNumber > 5 ||
      enteredAmount.length === 0
    ) {
      setInvalidInput(true);
      return;
    }
    props.addItem(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        label={"amount"}
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add+</button>
      {!invalidInput && "please enter correct input"}
    </form>
  );
};

export default MealItemForm;
