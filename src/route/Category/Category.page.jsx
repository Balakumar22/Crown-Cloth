import { useState } from "react";
import { useEffect } from "react";
import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product-Card/ProductCard.component";
import { ProductContext } from "../../context/product.context";
import "./Category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categories } = useContext(ProductContext);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </Fragment>
  );
};

export default Category;
