import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button, { BUTTON_TYPES } from "../Button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const { name, price, imageUrl } = product;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        btnType={BUTTON_TYPES.invert}
        onClick={() => addItemToCart(product)}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductCard;
