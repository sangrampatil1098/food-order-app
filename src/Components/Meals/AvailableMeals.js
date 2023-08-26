import React, { useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import useFetch from "../../Hooks/useFetch";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const handleLoading = (load) => {
    console.log("inside loading");
    setLoading(load);
  };
  const handleError = (err) => {
    setHttpError(err);
  };
  const requestConfig = {
    url: "https://http-post-request-93818-default-rtdb.firebaseio.com/meals.json",
  };
  console.log("Available meals rendered");
  const data = useFetch(requestConfig, handleLoading, handleError);
  console.log("data1", data);
  if (loading) {
    return <div className={classes.MealLoading}>Loading...</div>;
  }
  if (httpError) {
    return <div className={classes.MealError}>{httpError}</div>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {data.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default React.memo(AvailableMeals);
