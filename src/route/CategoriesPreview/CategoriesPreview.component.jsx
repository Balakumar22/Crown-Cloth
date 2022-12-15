// import { ProductContext } from "../../context/product.context";
// import { useContext } from "react";
import { Fragment } from "react";

import CategoryPreview from "../../Components/CategoryPreview/CategoryPreview.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import Spinner from "../../Components/Spinner/Spinner.component";

const CategoriesPreview = () => {
  // const { categories } = useContext(ProductContext);
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map((title) => {
          const products = categories[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
