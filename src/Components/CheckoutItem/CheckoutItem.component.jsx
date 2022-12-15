// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  reduceQuantity,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="icon" onClick={reduceProductQuantity}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="icon" onClick={addQuantity}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeProduct}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
