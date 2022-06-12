import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./checkout.styles.scss";
import CheckoutItem from "../../Components/CheckoutItem/CheckoutItem.component";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((product) => (
        <CheckoutItem product={product} />
      ))}
      <div className="total">
        <span>
          TOTAL: $
          {cartItems.reduce(
            (total, { price, quantity }) => total + price * quantity,
            0
          )}
        </span>
      </div>
    </div>
  );
};

export default Checkout;
