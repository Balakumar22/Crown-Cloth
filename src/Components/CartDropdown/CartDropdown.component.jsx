import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../Button/button.component";
import CartItem from "../CartItem/CartItem.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./CartDropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems, cartCount } = useContext(CartContext);

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
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
