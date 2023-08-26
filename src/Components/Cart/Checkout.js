import React, { useState } from "react";
import classes from "./Checkout.module.css";

const isValid = (input) => {
  return input.trim().length !== 0;
};

const isPincodeValid = (input) => {
  return input.trim().length >= 5;
};

const Checkout = (props) => {
  const [formData, setFormData] = useState({
    userName: "",
    street: "",
    pincode: "",
    city: "",
  });
  const [formValidity, setFormValidity] = useState({
    userName: true,
    street: true,
    pincode: true,
    city: true,
  });

  const handleChange = (identifier, value) => {
    if (identifier === "userName") {
      setFormData((formData) => {
        return {
          ...formData,
          userName: value,
        };
      });
    } else if (identifier === "street") {
      setFormData((formData) => {
        return {
          ...formData,
          [identifier]: value,
        };
      });
    } else if (identifier === "pincode") {
      setFormData((formData) => {
        return {
          ...formData,
          [identifier]: value,
        };
      });
    } else if (identifier === "city") {
      setFormData((formData) => {
        return {
          ...formData,
          [identifier]: value,
        };
      });
    }
  };

  const confirmHandler = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const userNameValid = isValid(formData.userName);
    const streetValid = isValid(formData.street);
    const pincodeValid = isPincodeValid(formData.pincode);
    const cityValid = isValid(formData.city);
    setFormValidity({
      userName: userNameValid,
      street: streetValid,
      pincode: pincodeValid,
      city: cityValid,
    });
    const formValid = userNameValid && streetValid && pincodeValid && cityValid;
    if (!formValid) {
      return;
    }
    props.onConfirm(formData);
  };

  const userNameClasses = `${classes.control} ${
    formValidity.userName ? "" : classes.invalid
  }`;

  const streetClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;

  const pincodeClasses = `${classes.control} ${
    formValidity.pincode ? "" : classes.invalid
  }`;

  const cityClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={userNameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => handleChange("userName", e.target.value)}
        />
      </div>
      {!formValidity.userName && <p>Please enter valid user name</p>}
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={(e) => handleChange("street", e.target.value)}
        />
      </div>
      {!formValidity.street && <p>Please enter valid street</p>}
      <div className={pincodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={(e) => handleChange("pincode", e.target.value)}
        />
      </div>
      {!formValidity.pincode && <p>Please enter valid pincode</p>}
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </div>
      {!formValidity.city && <p>Please enter valid city</p>}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
