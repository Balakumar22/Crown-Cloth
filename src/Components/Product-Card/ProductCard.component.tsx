// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/categories/categories.type";
import Button, { BUTTON_TYPES } from "../Button/button.component";

// import "./product-card.styles.scss";
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductCardImg,
  ProductName,
  ProductPrice,
} from "./ProductCard.style";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  // const { addItemToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, price, imageUrl } = product;

  return (
    <ProductCardContainer>
      <ProductCardImg src={imageUrl} alt={`${name}`} />
      <ProductCardFooter>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </ProductCardFooter>
      <Button
        btnType={BUTTON_TYPES.invert}
        onClick={() => dispatch(addItemToCart(cartItems, product))}
      >
        Add To Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
