import { useState, useEffect, Fragment } from "react";

// import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product-Card/ProductCard.component";
// import { ProductContext } from "../../context/product.context";
import "./Category.styles.scss";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import Spinner from "../../Components/Spinner/Spinner.component";

const Category = () => {
  const { category } = useParams();
  // const { categories } = useContext(ProductContext);
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
