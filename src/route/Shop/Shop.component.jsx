import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview.component";
import Category from "../Category/Category.page";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
