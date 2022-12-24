// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";

import CheckoutItem from "../../Components/CheckoutItem/CheckoutItem.component";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

// import "./checkout.styles.scss";
import PaymentForm from "../../Components/PaymentForm/PaymentForm.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./Checkout.style";

const Checkout = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((product, index) => (
        <CheckoutItem key={index} product={product} />
      ))}
      <Total>
        <span>TOTAL: ${cartTotal}</span>
      </Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
