import React, { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill size={150} />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt!</p>
        <p className="description">
          If you have further question, please contact via email
          <a className="email" href="mailto:contact@gmail.com">
            contact@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
