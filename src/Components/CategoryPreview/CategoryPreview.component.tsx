import React, { FC } from "react";
import ProductCard from "../Product-Card/ProductCard.component";

import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./CategoryPreview.style";
import { CategoryItem } from "../../store/categories/categories.type";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title} className="title">
          {title.toUpperCase()}
        </Title>
      </h2>
      <Preview>
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
