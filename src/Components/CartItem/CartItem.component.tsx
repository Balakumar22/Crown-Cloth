import React, { FC } from "react";
import "./cart-item.styles.scss";
import { CartItemContainer, CartItemImg, ItemDetails } from "./CartItem.style";

type CartItemProps = {
  cartItem: {
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  };
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} X ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
