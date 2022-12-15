// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import { Link } from "react-router-dom";
import Button from "../Button/button.component";
import CartItem from "../CartItem/CartItem.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./CartDropdown.styles.jsx";

import {
  selectCartItems,
  selectCartCount,
  selectCartOpen,
} from "../../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartIsOpen = useSelector(selectCartOpen);
  // const { cartItems, cartCount } = useContext(CartContext);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartCount === 0 ? (
          <EmptyMessage>Your Cart is Empty!</EmptyMessage>
        ) : (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        )}
      </CartItems>
      <Link to="/checkout">
        <Button onClick={() => dispatch(setIsCartOpen(!cartIsOpen))}>
          GO TO CHECKOUT
        </Button>
      </Link>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
