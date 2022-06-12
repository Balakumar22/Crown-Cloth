import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {
  ShoppingBag,
  CartIconContainer,
  ItemCount,
} from "./CartIcon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setCart, cartCount } = useContext(CartContext);

  const toggleCart = () => {
    setCart(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingBag />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
