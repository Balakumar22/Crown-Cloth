// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  reduceQuantity,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";
// import "./checkout-item.styles.scss";
import {
  CheckoutItemContainer,
  CheckoutItemImg,
  CheckoutItemSpan,
  ImageContainer,
} from "./CheckoutItem.style";

type CheckoutItemProps = {
  product: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ product }) => {
  // const { reduceQuantity, removeItemFromCart, addItemToCart } =
  //   useContext(CartContext);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity } = product;

  const reduceProductQuantity = () =>
    dispatch(reduceQuantity(cartItems, product));

  const addQuantity = () => dispatch(addItemToCart(cartItems, product));

  const removeProduct = () => dispatch(removeItemFromCart(cartItems, product));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <CheckoutItemImg src={imageUrl} alt={name} />
      </ImageContainer>
      <CheckoutItemSpan>{name}</CheckoutItemSpan>
      <CheckoutItemSpan className="quantity">
        <div className="icon" onClick={reduceProductQuantity}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="icon" onClick={addQuantity}>
          &#10095;
        </div>
      </CheckoutItemSpan>
      <CheckoutItemSpan>{price}</CheckoutItemSpan>
      <div className="remove-button" onClick={removeProduct}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
