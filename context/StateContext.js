import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

// @ts-ignore
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  // @ts-ignore
  let index;

  // Adds items to cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      // @ts-ignore
      (item) => item._id === product._id
    );

    setTotalPrice(
      // @ts-ignore
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        // @ts-ignore
        if (cartProduct._id === product._id)
          return {
            // @ts-ignore
            ...cartProduct,
            // @ts-ignore
            quantity: cartProduct.quantity + quantity,
          };
      });
      // @ts-ignore
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      // @ts-ignore
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  // Removes a product from the cart
  const onRemove = (product) => {
    // @ts-ignore
    foundProduct = cartItems.find((item) => item._id === product._id);
    // @ts-ignore
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    // @ts-ignore
    setCartItems(newCartItems);
  };

  // Increments and decrements the quantity for each added items
  // @ts-ignore
  const toggleCartItemQuantity = (id, value) => {
    // @ts-ignore
    foundProduct = cartItems.find((item) => item._id === id);
    // @ts-ignore
    index = cartItems.findIndex((product) => product._id === id);
    // @ts-ignore
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        // @ts-ignore
        ...newCartItems,
        // @ts-ignore
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      // @ts-ignore
      if (foundProduct.quantity > 1) {
        setCartItems([
          // @ts-ignore
          ...newCartItems,
          // @ts-ignore
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        // @ts-ignore
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
