import "./App.css";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import { useState } from "react";
import CartContextProvider from "./store/CartContextProvider";
function App() {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };
  return (
    <CartContextProvider>
      {showModal && <Cart onClose={handleModal} />}
      <Header onCart={handleModal} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
