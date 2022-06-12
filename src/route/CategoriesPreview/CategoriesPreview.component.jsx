import { ProductContext } from "../../context/product.context";
import { Fragment, useContext } from "react";

import CategoryPreview from "../../Components/CategoryPreview/CategoryPreview.component";

const CategoriesPreview = () => {
  const { categories } = useContext(ProductContext);

  return (
    <Fragment>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
