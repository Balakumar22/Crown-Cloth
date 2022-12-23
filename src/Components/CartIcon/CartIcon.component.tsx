// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
///<reference types="react-script">
import {
  ShoppingBag,
  CartIconContainer,
  ItemCount,
} from "./CartIcon.styles.jsx";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectCartOpen,
} from "../../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";

const CartIcon = () => {
  const dispatch = useDispatch();
  // const { isCartOpen, setCart, cartCount } = useContext(CartContext);
  const isCartOpen = useSelector(selectCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleCart = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingBag />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
