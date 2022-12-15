// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";

import CheckoutItem from "../../Components/CheckoutItem/CheckoutItem.component";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import "./checkout.styles.scss";
import PaymentForm from "../../Components/PaymentForm/PaymentForm.component";

const Checkout = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
      {cartItems.map((product, index) => (
        <CheckoutItem key={index} product={product} />
      ))}
      <div className="total">
        <span>TOTAL: ${cartTotal}</span>
      </div>
      <PaymentForm />
    </div>
  );
};

export default Checkout;
