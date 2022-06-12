import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
  const { reduceQuantity, removeItemFromCart, addItemToCart } =
    useContext(CartContext);

  const { name, imageUrl, price, quantity } = product;

  const reduceProductQuantity = () => reduceQuantity(product);

  const addQuantity = () => addItemToCart(product);

  const removeProduct = () => removeItemFromCart(product);

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
